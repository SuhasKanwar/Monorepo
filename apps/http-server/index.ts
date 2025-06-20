import { prismaClient } from "db/client";
import express, { type Request, type Response } from "express";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("HTTP server is running successfully!!!");
    return;
});

app.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await prismaClient.user.findMany();
        res.status(200).json({
            message: "Users fetched successfully",
            data: users
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

app.post("/users", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            message: "Username and password are required"
        });
        return;
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                username: username,
                password: password
            }
        });
        res.status(201).json({
            message: "User created successfully",
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
    finally {
        return;
    }
});

app.listen(PORT, (err) => {
    if(err) {
        console.error("Error starting server -> ", err);
    }
    else {
        console.log(`HTTP server is running on port -> ${PORT}`);
    }
});