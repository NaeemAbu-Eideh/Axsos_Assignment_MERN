import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("chat_name") || "";
    if (saved) setName(saved);
  }, []);

  const startChatting = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setErr("your name( at least 2 chars )");
      return;
    }
    localStorage.setItem("chat_name", trimmed);
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow rounded-xl border">
        <div className="border-b p-6">
          <h1 className="text-3xl font-extrabold text-center">MERN Chat</h1>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Get started right now!</h2>

          <p className="text-center mb-3">I want to start chatting with the name…</p>

          <form onSubmit={startChatting} className="flex gap-4 justify-center items-center">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErr("");
              }}
              className="w-full max-w-md border rounded-lg px-4 py-3 outline-none focus:ring"
              placeholder="My name…"
              autoFocus
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-3 rounded-lg"
            >
              Start Chatting
            </button>
          </form>

          {err ? <p className="text-red-600 text-center mt-4">{err}</p> : null}
        </div>
      </div>
    </div>
  );
}
