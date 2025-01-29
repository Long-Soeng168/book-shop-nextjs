import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { getSlides } from "@/services/slides-services";
import Link from "next/link";
import { IMAGE_SLIDE_URL } from "@/config/env";

const MyProductDetailBanner = async ({ className }) => {
  const topSlides = (await getSlides({ position: "product_detail" })) || [];
  return (
    <div className={className}>
      {topSlides.length > 0 && (
        <Carousel>
          <CarouselContent>
            {topSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <Link href={slide.link || "#"}>
                  <Image
                    className={`w-full object-cover h-auto transition-all duration-500 ${
                      slide.link
                        ? "hover:scale-95 border-primary hover:border-2"
                        : ""
                    }`}
                    width={1050}
                    height={300}
                    src={IMAGE_SLIDE_URL + slide.image}
                    alt={slide.name}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="invisible rounded-none opacity-70 md:visible" />
          <CarouselNext className="invisible rounded-none opacity-70 md:visible" />
        </Carousel>
      )}
    </div>
  );
};

export default MyProductDetailBanner;
