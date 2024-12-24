import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { getTranslations } from "next-intl/server";

const MyProductHeader = async ({ title, categoryId = '' }) => {
  const t = await getTranslations('Index');
  return (
    <div className="flex justify-between mb-4 border-b-4 border-primary">
      <h2 className="px-8 pt-2 pb-1 text-lg font-semibold rounded-tl-full rounded-br-full pr-9 text-primary-foreground bg-primary">
        {title}
      </h2>
      <Link
        href={`/products${categoryId ? '?categoryId='+categoryId : ''}`}
        className="flex items-center gap-1 text-xl transition-all duration-500 hover:underline text-primary hover:translate-x-4"
      >
        {t('seeMore')}
        <ChevronRight />
      </Link>
    </div>
  );
};

export default MyProductHeader;