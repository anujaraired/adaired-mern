import express from "express";
import { getBlogs, createBlog } from "../controllers/blogController";
import upload from "../config/upload";

const router = express.Router();

router.get("/get", getBlogs);
router.post("/", upload.single("image"), createBlog);

export default router;