import express from "express";
import next from "next";
import dotenv from "dotenv";
import { connectDB } from "./backend/config/db";
import blogRoutes from "./backend/routes/blogRoutes";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    const server = express();

    await connectDB();

    server.use(express.json());

    // Backend API
    server.use("/api/blog", blogRoutes);

    // Next.js handles frontend
    server.use((req, res) => {
        return handle(req, res);
    });

    server.listen(5000, () => {
        console.log("Server running on http://localhost:5000");
    });
});