"use client";

import InputField from "@/app/components/UI/InputField";
import React, { useEffect, useState } from "react";
import Editor from "@/app/components/Editor";
import SelectField from "@/app/components/UI/SelectField";
import ImageUpload from "@/app/components/UI/ImageUpload";
import axios from "axios";
import { BaseURL } from "@/app/baseUrl";
import { useParams } from "next/navigation";
interface CategoryType {
  label: string;
  value: string;
}

const CreateBlog = () => {
  const params = useParams();
  const blogId = params?.id;
  const isEditMode = blogId !== "create";
  const [categoryOptions, setCategoryOptions] = useState<CategoryType[]>([]);
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [inputVal, setInputVal] = useState({
    postTitle: "",
    slug: "",
    category: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      focusKeyword: "",
    },
  });

  /* =============================
     Handle Normal + Nested Fields
  ============================== */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("seo.")) {
      const key = name.split(".")[1];

      setInputVal((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          [key]: value,
        },
      }));
    } else {
      setInputVal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /* =============================
     Auto Slug Generate
  ============================== */
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputVal((prev) => ({
      ...prev,
      postTitle: value,
      slug: generateSlug(value),
    }));
  };

  /* =============================
     Image Upload
  ============================== */
  const handleImageUpload = (file: File) => {
    setSelectedFile(file);
  };

  /* =============================
     Submit Blog
  ============================== */
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("postTitle", inputVal.postTitle);
      formData.append("slug", inputVal.slug);
      formData.append("category", inputVal.category);
      formData.append("postDescription", content);
      formData.append("seo", JSON.stringify(inputVal.seo));

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      if (isEditMode) {
        await axios.put(`${BaseURL}/blog/${blogId}`, formData);
        alert("Blog Updated Successfully ✅");
      } else {
        await axios.post(`${BaseURL}/blog`, formData);
        alert("Blog Created Successfully ✅");
      }
    } catch (err: any) {
      console.log(err.response?.data || err.message);
    }
  };
  /* =============================
     Fetch Categories
  ============================== */
  const getCategories = async () => {
    try {
      const res = await axios.get(`${BaseURL}/blog-category/read`);

      if (res.status === 200) {
        const formatted = res.data?.data?.map((item: any) => ({
          label: item?.name,
          value: item?._id,
        }));

        setCategoryOptions(formatted);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleBlog = async () => {
    try {
      const res = await axios.get(`${BaseURL}/blog/${blogId}`);
      console.log(res,"res>>>>>>>>>>>kjsd")

      if (res.status === 200) {
        const blog = res.data;

        setInputVal({
          postTitle: blog.postTitle,
          slug: blog.slug,
          category: blog.category,
          seo: blog.seo || {
            metaTitle: "",
            metaDescription: "",
            keywords: "",
            focusKeyword: "",
          },
        });

        setContent(blog.postDescription);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
    if (isEditMode) {
      getSingleBlog();
    }
  }, []);

  return (
    <div className="space-y-6">
      <h3>Create Blog</h3>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 space-y-4">
          <InputField
            name="postTitle"
            placeholder="Enter Heading"
            value={inputVal.postTitle}
            handleChange={handleTitleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              name="slug"
              placeholder="Enter Slug"
              value={inputVal.slug}
              handleChange={handleChange}
            />

            <SelectField
              name="category"
              value={inputVal.category}
              handleChange={handleChange}
              options={categoryOptions}
            />
          </div>
        </div>

        <ImageUpload onUpload={handleImageUpload} />
      </div>

      <Editor content={content} setContent={setContent} />

      {/* =============================
          SEO Section
      ============================== */}
      <div className="space-y-4">
        <p className="font-semibold">Meta Tags</p>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            name="seo.metaTitle"
            placeholder="Enter SEO Title"
            value={inputVal.seo.metaTitle}
            handleChange={handleChange}
          />

          <InputField
            name="seo.keywords"
            placeholder="Enter Keywords"
            value={inputVal.seo.keywords}
            handleChange={handleChange}
          />
        </div>

        <InputField
          name="seo.focusKeyword"
          placeholder="Enter Focus Keyword"
          value={inputVal.seo.focusKeyword}
          handleChange={handleChange}
        />

        <InputField
          name="seo.metaDescription"
          placeholder="Enter Description"
          value={inputVal.seo.metaDescription}
          handleChange={handleChange}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          Create Blog
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;