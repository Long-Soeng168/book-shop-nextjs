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

const MySlideShow = async ({className}) => {
  const topSlides = await getSlides({ position: "top" }) || [];
  const bottomSlides = await getSlides({ position: "bottom" }) || [];
  return (
    <div className={className}>
      {topSlides.length > 0 && (
        <Carousel>
          <CarouselContent>
            {topSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <Link href={slide.link || "#"}>
                  <Image
                    className={`w-full aspect-[21/7] object-cover transition-all duration-500 ${
                      slide.link ? "hover:scale-95 border-primary hover:border-2" : ""
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}

      {bottomSlides.length > 0 && (
        <Carousel className="mt-2 lg:mt-4">
          <CarouselContent>
            {bottomSlides.map((slide) => (
              <CarouselItem key={slide.id} className="pl-2 lg:pl-4 basis-1/2 lg:basis-1/3">
                <Link href={slide.link || "#"}>
                  <Image
                    className={`object-cover w-full aspect-video transition-all duration-500 ${
                      slide.link ? "hover:scale-95 border-primary hover:border-2" : ""
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default MySlideShow;
