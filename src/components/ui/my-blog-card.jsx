import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Adjust import path based on your project
import { getTranslations } from "next-intl/server";
import { IMAGE_BLOG_URL } from "@/config/env";

const MyBlogCard = async ({ blog }) => {
  const t = await getTranslations('Index');
  return (
    <Link
      href={`blogs/${blog.id}`}
      className="flex flex-col justify-between p-2 transition-shadow duration-300 rounded-lg cursor-pointer border-border bg-accent hover:shadow-xl"
    >
      <div>
        <Image
          width={600}
          height={600}
          className="object-cover w-full rounded-md aspect-video"
          src={IMAGE_BLOG_URL + blog.image}
          alt={'Image\'s ' + blog.name}
        />
        <div className="m-2">
          <h3 className="text-xl font-bold text-foreground line-clamp-2">
            {blog.name}
          </h3>
          {/* <p className="mb-2 text-background-foreground line-clamp-3">
            {blog.short_description}
          </p> */}
          {/* <p className="mb-2 text-background-foreground line-clamp-3">
            CategoryId : {blog.news_category_id}
          </p> */}
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="link" className="text-lg text-primary">
          {t('seeMore')} {'>'}
        </Button>
      </div>
    </Link>
  );
};

export default MyBlogCard;
