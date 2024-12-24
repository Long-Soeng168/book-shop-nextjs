import MyProductHeader from "@/components/my-product-header";
import MyProductsList from "@/components/my-product-list";
import { delay } from "@/lib/utils";
import { getBooks } from "@/services/books-services";
import { getTranslations } from "next-intl/server";
import React from "react";

const RelatedProducts = async ({ categoryId }) => {
  const t = await getTranslations('Index');
  const resultBooks = await getBooks({
    categoryId: categoryId,
    randomOrder: 1,
  });
  const relatedBooks = resultBooks?.data;

  return (
    <div className="flex flex-col gap-2 mt-16 mb-4">
      <MyProductHeader title={t('related')} categoryId={categoryId} />
      <MyProductsList books={relatedBooks} showNavigateButton={false} />
    </div>
  );
};

export default RelatedProducts;
