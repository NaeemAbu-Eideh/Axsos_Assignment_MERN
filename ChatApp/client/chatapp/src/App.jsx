import { Navigate, Route, Routes } from "react-router-dom";
import Join from "./pages/Join.jsx";
import Chat from "./pages/Chat.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
