"use client";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // Required styles
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"; // Thumbnail plugin
import "yet-another-react-lightbox/plugins/thumbnails.css"; // Thumbnail plugin styles
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

// const images = [
//   "/images/banners/banner3.png",
//   "/images/banners/banner1.png",
//   "/images/banners/banner2.png",
// ];

const MyImageGallery = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = images.map((src) => ({ src })); // Convert images array to Lightbox format

  return (
    <div>
      {/* Large image at the top */}
      <div className="w-full mb-2">
        <Image
          width={600}
          height={600}
          src={images[0]}
          alt="Large Image"
          className="object-cover w-full transition-all duration-300 border rounded-lg cursor-pointer border-primary/20 hover:scale-95"
          onClick={() => {
            setCurrentIndex(0);
            setOpen(true);
          }}
        />
      </div>

      {/* Thumbnails for the rest of the images */}
      <Carousel className="mt-2 lg:mt-4">
        <CarouselContent>
          {images.slice(1).map((photo, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3"
            >
              <Image
                width={600}
                height={600}
                src={photo}
                alt={`Image ${index + 2}`} // Adjusted index for thumbnails
                className="object-cover w-full transition-all duration-300 border rounded-lg cursor-pointer hover:scale-95 border-primary/20 aspect-square"
                onClick={() => {
                  setCurrentIndex(index + 1); // Adjust index for thumbnails
                  setOpen(true);
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.slice(1).length > 3 && (
          <>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </>
        )}
      </Carousel>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentIndex}
        plugins={[Thumbnails, Zoom, Slideshow, Fullscreen]}
        carousel={{ finite: true }}
      />
    </div>
  );
};

export default MyImageGallery;
