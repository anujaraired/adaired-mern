import express from "express";
import { getBlogs, createBlog, updateBlog, getBlogById } from "../controllers/blogController";
import upload from "../config/upload";

const router = express.Router();

router.get("/get", getBlogs);
router.post("/", upload.single("image"), createBlog);
router.patch("/update/:id", upload.single("image"), updateBlog);
router.get("/:id", getBlogById);



export default router;