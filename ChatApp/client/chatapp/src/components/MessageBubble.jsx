export default function MessageBubble({ msg, currentName }) {
  if (msg.type === "system") {
    return (
      <div className="my-3 flex justify-center">
        <div className="text-xs text-gray-600 bg-white border rounded-full px-4 py-2">
          {msg.text}
        </div>
      </div>
    );
  }

  const isMe = msg.name === currentName;

  return (
    <div className={`my-3 flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-2xl border px-4 py-3 ${
          isMe ? "bg-blue-200" : "bg-gray-200"
        }`}
      >
        <p className="font-bold mb-1">
          {isMe ? "You said" : `${msg.name} said`}
        </p>
        <p className="whitespace-pre-wrap break-words">{msg.text}</p>
      </div>
    </div>
  );
}
