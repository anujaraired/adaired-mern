import { Request, Response } from "express";
import Blog from "../models/Blog";

export const getBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

export const createBlog2 = async (req: Request, res: Response) => {
  try {
    const blogData: any = { ...req.body };

    // Parse SEO JSON string if provided
    if (req.body.seo) {
      try {
        blogData.seo = JSON.parse(req.body.seo);
      } catch { }
    }

    // Add uploaded image (Cloudinary)
    if (req.file) {
      blogData.image = {
        url: req.file.path,                          // Cloudinary URL
        public_id: req.file.filename || req.file.originalname,
      };
    }

    const blog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const createBlog = async (req: Request, res: Response) => {
  try {
    const blogData: any = { ...req.body };

    // Parse SEO JSON
    if (req.body.seo) {
      blogData.seo = JSON.parse(req.body.seo);
    }

    // ✅ Generate Canonical Link Automatically
    if (!blogData.seo) {
      blogData.seo = {};
    }

    blogData.seo.canonicalLink = `https://adaired.com/blog/${blogData.slug}`;

    // Cloudinary image
    if (req.file) {
      blogData.image = {
        url: req.file.path,
        public_id: req.file.filename || req.file.originalname,
      };
    }

    const blog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};