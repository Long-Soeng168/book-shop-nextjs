import { Eye } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const MyBlogList = async ({ blogs }) => {
  const t = await getTranslations('Index');
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {blogs?.map((blog) => (
        <Link
          href={`blogs/${blog.id}`}
          key={blog.id}
          className="flex flex-col justify-between p-2 transition-shadow duration-300 rounded-lg cursor-pointer border-border bg-primary/5 hover:shadow-xl"
        >
          <div>
            <Image
              width={600}
              height={600}
              className="object-cover w-full rounded-md aspect-video"
              src={process.env.IMAGE_BLOG_URL + blog.image}
              alt=""
            />
            <div className="my-4">
              <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                {blog.name}
              </h3>
              <p className="mb-2 text-background-foreground line-clamp-2">
                {blog.short_description}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="link" className="mt-2 text-lg text-primary">
              {t('readMore')}
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MyBlogList;
