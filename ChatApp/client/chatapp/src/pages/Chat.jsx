import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket.js";
import MessageBubble from "../components/MessageBubble.jsx";

const makeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

function normalizeMessage(raw) {
  if (raw == null) {
    return null;
  }

  if (typeof raw === "string") {
    return {
      id: makeId(),
      type: "system",
      name: "system",
      text: raw,
      time: Date.now(),
    };
  }

  const name = raw.name || raw.username || "Anonymous";
  const text = raw.text || raw.message || "";
  const type = raw.type || (name === "system" ? "system" : "user");
  const time = raw.time || Date.now();

  return {
    id: raw.id || makeId(),
    type,
    name,
    text,
    time,
  };
}

export default function Chat() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const name = useMemo(() => localStorage.getItem("chat_name") || "", []);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!name) {
      navigate("/", { replace: true });
      return;
    }

    if (!socket.connected) socket.connect();

    socket.emit("join", { name });

    const onNewMessageFromServer = (msg) => {
      const normalized = normalizeMessage(msg);
      if (!normalized) return;

      setMessages((prevMessages) => {
        return [...prevMessages, normalized];
      });
    };

    const onHistory = (history) => {
      if (!Array.isArray(history)) return;
      const normalized = history
        .map((m) => normalizeMessage(m))
        .filter(Boolean);
      setMessages(normalized);
    };

    const onNewMessage = (msg) => onNewMessageFromServer(msg);
    const onSystem = (msg) => onNewMessageFromServer({ name: "system", type: "system", ...msg });

    const onConnectError = (err) => {
      onSystem({ text: err?.message || "Connection error" });
    };

    socket.on("chat_history", onHistory);
    socket.on("new_message", onNewMessage);
    socket.on("system_message", onSystem);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("chat_history", onHistory);
      socket.off("new_message", onNewMessage);
      socket.off("system_message", onSystem);
      socket.off("connect_error", onConnectError);
    };
  }, [name, navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    socket.emit("send_message", { text });

    setInput("");
  };

  const logout = () => {
    localStorage.removeItem("chat_name");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow rounded-xl border flex flex-col">
        <div className="border-b p-6 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-center w-full">MERN Chat</h1>
          <button
            onClick={logout}
            className="ml-4 shrink-0 text-sm font-bold text-gray-700 hover:underline"
            type="button"
          >
            Change name
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-600 mb-3">You are: <span className="font-bold">{name}</span></p>

          <div className="h-[480px] border rounded-lg p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 mt-12">no messages yet</p>
            ) : (
              messages.map((m) => <MessageBubble key={m.id} msg={m} currentName={name} />)
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={sendMessage} className="mt-4 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring"
              placeholder="your messagw"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
