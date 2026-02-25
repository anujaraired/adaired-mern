import { Request, Response } from "express";
import Blog from "../models/Blog";

export const getBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

export const createBlog = async (req: Request, res: Response) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
};