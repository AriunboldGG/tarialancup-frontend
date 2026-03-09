 "use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const slides = [
  {
    id: "poster-1",
    src: "/images/cover-1.png",
    alt: "2K26 Tarialan Cup Poster 1",
  },
  {
    id: "poster-2",
    src: "/images/cover-2.png",
    alt: "2K26 Tarialan Cup Poster 2",
  },
  {
    id: "poster-3",
    src: "/images/cover-111.png",
    alt: "2K26 Tarialan Cup Poster 3",
  },
];

export default function Brands() {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent>
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView="auto"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={slides.length > 1}
            breakpoints={{
              640: {
                spaceBetween: 20,
              },
              768: {
                spaceBetween: 24,
              },
            }}
            className="brands-swiper"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} style={{ width: 'auto' }}>
                <div className="relative h-36 md:h-40 w-64 md:w-80 rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 256px, 100vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </CardContent>
    </Card>
  );
}


