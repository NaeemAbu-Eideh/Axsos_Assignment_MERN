import { useEffect } from "react";
import { io } from "socket.io-client";

const Chat = () => {
    useEffect(() => {
        const socket = io("http://192.168.0.102:3000");

        socket.on("connect", () => {
            console.log("connected:", socket.id);
        });

        socket.on("welcome", (msg) => {
            console.log("server says:", msg);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Chat Component</h2>
            <p>Open the console to see the welcome message.</p>
        </div>
    );
};

export default Chat;
