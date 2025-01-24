import { Eye } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { IMAGE_BLOG_URL } from "@/config/env";
import MyBlogCard from "./ui/my-blog-card";

const MyBlogList = async ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {blogs?.map((blog) => (
        <MyBlogCard blog={blog} />
      ))}
    </div>
  );
};

export default MyBlogList;
