import { prismaClient } from "db/client";
import { WebSocketServer } from "ws";

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

wss.on("listening", () => {
    console.log(`WebSocket server is running on port -> ${PORT}`);
});

wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
        await prismaClient.user.create({
            data: {
                username: `user-${Date.now()}`,
                password: message.toString()
            }
        });
        ws.send(`Server received -> ${message}`);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});