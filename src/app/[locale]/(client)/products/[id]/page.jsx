import MyGallery from "@/components/my-gallery";
import MyKeyValueCard from "@/components/ui/my-key-value-card";
import { getBook } from "@/services/books-services";
import MyShowMoreText from "@/components/ui/my-show-more-text";
import moment from "moment";
import Link from "next/link";
import { Suspense } from "react";
import MyLoadingAnimation from "@/components/ui/my-loading-animation";
import MyAddToCart from "@/components/my-add-to-cart";
import MyBuyNowButton from "@/components/my-buy-now-button";
import RelatedProducts from "./components/related-products";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { IMAGE_BOOK_URL } from "@/config/env";
import ScrollToTop from "@/components/scroll-to-top";
import MyReadPdfButton from "@/components/my-read-pdf-button";
// import BestSelling from "./components/best-selling";
// import Categories from "./components/categories";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getBook({ id: id });
  return {
    title: product.title,
    description: product.short_description,
    openGraph: {
      title: product.title,
      description: product.short_description,
      images: [`${IMAGE_BOOK_URL + "thumb/" + product.image}`],
    },
  };
}

const ProductPage = async ({ params }) => {
  const locale = await getLocale();
  const t = await getTranslations("Index");
  const { id } = await params;
  const product = await getBook({ id: id });
  const image = product?.image;

  let images = [];
  if (product?.images?.length > 0) {
    images = product?.images.map((item) => item.image);
  }

  if (product == 404) {
    notFound();
  }


  return (
    <div className="lg:flex">
      <ScrollToTop />
      {/* <aside className="flex-col hidden px-2 py-4 -translate-x-2 lg:flex bg-primary/5">
        <Categories />
        <hr className="my-6" />
        <Label className="text-primary">Best Selling</Label>
        <BestSelling />
      </aside> */}
      <main className="w-full lg:flex-1">
        <div className="grid w-full grid-cols-12 gap-2 mx-auto mt-8 ">
          <div className="col-span-12 mx-6 mb-6 md:col-span-4 md:px-0">
            <div className="pb-4 ">
              <MyGallery image={image} images={images} />
            </div>
            {product?.file && (
              // <a
              //   href={`https://admin.thnal.org/assets/pdf/books/${product?.file}`}
              //   className="mt-8"
              // >
              //   <Button className="w-full" variant="destructive">
              //     <BookOpenTextIcon /> Read
              //   </Button>
              // </a>
              <MyReadPdfButton product={product} />
            )}
          </div>

          {/* Right Item */}
          <div className="col-span-12 md:col-span-8">
            <h1 className="block mt-1 mb-2 text-2xl leading-tight font-lg">
              {product?.title}
            </h1>
            <MyShowMoreText maxLine={2} text={product?.short_description} />
            <hr className="w-full my-6" />
            <div className="flex flex-col gap-6 my-6">
              <div className="flex flex-col gap-2">
                {product?.author && (
                  <MyKeyValueCard title={t("author")}>
                    <Link
                      className="hover:underline underline-offset-4 text-primary"
                      href={`/products?authorId=${product?.author.id}`}
                    >
                      {product?.author.name}
                    </Link>
                  </MyKeyValueCard>
                )}
                {product?.publisher && (
                  <MyKeyValueCard title={t("publisher")}>
                    <Link
                      className="hover:underline underline-offset-4 text-primary"
                      href={`/products?publisherId=${product?.publisher.id}`}
                    >
                      {product?.publisher.name}
                    </Link>
                  </MyKeyValueCard>
                )}

                {product?.category && (
                  <MyKeyValueCard title={t("category")}>
                    <Link
                      className="hover:underline underline-offset-4 text-primary"
                      href={`/products?categoryId=${product?.category.id}`}
                    >
                      {locale == "kh"
                        ? product?.category?.name_kh
                        : product?.category?.name}
                    </Link>
                    <p className="text-sm capitalize"></p>
                    {product?.sub_category && (
                      <>
                        <p className="mx-2"> / </p>
                        <Link
                          className="hover:underline underline-offset-4 text-primary"
                          href={`/products?categoryId=${product?.category.id}&subCategoryId=${product?.sub_category.id}`}
                        >
                          {locale == "kh"
                            ? product?.sub_category?.name_kh
                            : product?.sub_category?.name}
                        </Link>
                      </>
                    )}
                  </MyKeyValueCard>
                )}

                {/* {product?.publication_date && (
                  <MyKeyValueCard
                    title="Publication Date"
                    value={moment(product?.publication_date).format(
                      "D - MMMM - YYYY"
                    )}
                  />
                )} */}
                {product?.year && (
                  <MyKeyValueCard
                    title={t("publishedYear")}
                    value={product?.year}
                  />
                )}
                {product?.number_of_pages && (
                  <MyKeyValueCard
                    title={t("pages")}
                    value={product?.number_of_pages}
                  />
                )}
                {product?.isbn && (
                  <MyKeyValueCard title={t("isbn")} value={product?.isbn} />
                )}
                {product?.tsin && (
                  <MyKeyValueCard title={t("tsin")} value={product?.tsin} />
                )}
                {product?.edition && (
                  <MyKeyValueCard
                    title={t("edition")}
                    value={product?.edition}
                  />
                )}
                {product?.language && (
                  <MyKeyValueCard
                    title={t("language")}
                    value={
                      product?.language == "khmer" ? t("khmer") : t("english")
                    }
                  />
                )}
                {product?.created_at && (
                  <MyKeyValueCard
                    title={t("postDate")}
                    value={moment(product?.created_at).format(
                      "D - MMMM - YYYY"
                    )}
                  />
                )}
                {product?.updated_at && (
                  <MyKeyValueCard
                    title={t("lastUpdate")}
                    value={moment(product?.updated_at).format(
                      "D - MMMM - YYYY"
                    )}
                  />
                )}
              </div>
            </div>
            <div className="my-4">
              {product?.discount != 0 ? (
                <p className="space-x-4 text-2xl font-semibold text-gray-400 dark:text-white">
                  <span className="line-through">{product?.price} $</span>
                  <span className="text-red-500">
                    {product?.price -
                      (product?.discount / 100) * product?.price}{" "}
                    $
                  </span>
                </p>
              ) : (
                <p className="text-2xl font-semibold text-red-500">
                  {product?.price} $
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-4">
                {/* Quantity Control */}
                {/* <div className="flex items-center">
                  <Button
                    variant="outline"
                    className="rounded-tr-none rounded-br-none"
                  >
                    <Minus className="text-primary" />
                  </Button>
                  <Button
                    variant="outline"
                    className="px-6 font-bold rounded-none cursor-auto border-x-0"
                  >
                    1
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-tl-none rounded-bl-none"
                  >
                    <Plus className="text-primary" />
                  </Button>
                </div> */}
                {/* Add to Cart Button */}
                <MyBuyNowButton product={product} />
                <MyAddToCart product={product} />
              </div>
            </div>
          </div>
        </div>

        <Suspense key={product?.category_id} fallback={<MyLoadingAnimation />}>
          <RelatedProducts categoryId={product?.category_id} />
        </Suspense>
      </main>
    </div>
  );
};

export default ProductPage;
