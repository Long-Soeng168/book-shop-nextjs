import { getBlogs } from "@/services/blogs-services";
import React from "react";
import MyHeading from "../ui/my-heading";
import MyBlogList from "../my-blog-list";
import { getTranslations } from "next-intl/server";

const Blogs = async () => {
  const t = await getTranslations('Index');
  const resultsBlogs = await getBlogs({ perPage: 3 });
  const blogs = resultsBlogs?.data;
  return (
    <>
      {blogs?.length > 0 && (
        <div className="flex flex-col gap-4 mb-20">
          <MyHeading
            title={t('news')}
            // description={t('newsDescription')}
          />
          <MyBlogList blogs={blogs} />
        </div>
      )}
    </>
  );
};

export default Blogs;
