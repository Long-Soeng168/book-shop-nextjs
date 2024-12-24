import Image from "next/image";
import React from "react";
import { MyHeaderNav } from "./my-header-nav";
import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./language-toggle";
import Link from "next/link";
import {
  getCategories,
  getCategoryHasMostBooks,
} from "@/services/categories-services";
import MyCartButtonHeader from "./ui/my-cart-button-header";
import { getTranslations } from "next-intl/server";
import MySearch from "./ui/my-search";
import MyHomeModal from "./my-home-modal";
import { User2 } from "lucide-react";
import { Button } from "./ui/button";

const MyHeader = async () => {
  const resultCateogries = await getCategories({
    orderBy: "books_count",
    orderDir: "desc",
    withSub: 1,
  });

  const categoryMostBooks = await getCategoryHasMostBooks();
  const t = await getTranslations("Index");
  return (
    <div>
      <div className="flex flex-wrap py-4 lg:gap-10 lg:items-center">
        {/* Start Logo */}
        <div className="flex items-center justify-between w-full gap-2 mb-4 lg:mb-0 lg:w-auto">
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <Image
              className="object-contain rounded-md"
              src="/images/logo_thnal.png"
              width={60}
              height={60}
              alt="Logo Image"
            />
            {/* <p className="text-2xl font-bold max-w-26 text-primary-foreground dark:text-white">
              Thnal
            </p> */}
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <ModeToggle />
            <LanguageToggle />
            <MyHomeModal categories={resultCateogries} />
          </div>
        </div>

        {/* Start Action  */}
        <div className="flex items-center justify-end flex-1 w-full gap-2">
          {/* <MyHeaderSearchInput /> */}
          <MySearch placeholder={t("searchBooks")} />
          <MyCartButtonHeader />
          <Link href="/login">
            <Button variant="outline" size="icon">
              <User2 />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-wrap hidden py-4 lg:flex lg:items-center">
        {/* Start Logo */}

        {/* Start Nav Bar */}
        <div className="text-primary-foreground dark:text-white">
          <MyHeaderNav
            categories={resultCateogries}
            categoryMostBook={categoryMostBooks}
          />
        </div>

        {/* Start Action  */}
        <div className="flex items-center justify-end flex-1 w-full gap-2">
          <ModeToggle />
          <LanguageToggle />
          {/* <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-[1.2rem] w-[1.2rem] " />
            <span className="sr-only">Menu</span>
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default MyHeader;
