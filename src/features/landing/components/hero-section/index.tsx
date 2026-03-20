"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ArrowRightIcon from "@/assets/icons/ic-arrow-right.svg";
import { cn } from "@/shared/utils/cn";

const SLIDE_COUNT = 3;
const AUTO_ADVANCE_MS = 5000;

const slides = [
  {
    id: 1,
    image: "/assets/images/landing/d-hero-banner.png",
    logo: "/assets/images/landing/logo-kingtech-wide.png",
    heading: (
      <>
        Chăm Sóc Đôi Mắt Mỗi Ngày <br />
        Massage Êm, Ngủ Ngon Hơn
      </>
    ),
    description:
      'Máy massage mắt KingTech là "trợ thủ" giúp đôi mắt của bạn được thư giãn đúng nghĩa sau cả ngày dài làm việc với màn hình. Với công nghệ nhiệt ấm, massage khí nén và rung đa điểm, thiết bị nhẹ nhàng xoa dịu vùng mắt. Cải thiện giấc ngủ của bạn',
    priceLabel: "Giá chỉ từ:",
    priceValue: "1.000.000VND",
  },
  {
    id: 2,
    image: "/assets/images/landing/d-hero-banner.png",
    logo: "/assets/images/landing/logo-kingtech-wide.png",
    heading: (
      <>
        Chăm Sóc Đôi Mắt Mỗi Ngày <br />
        Massage Êm, Ngủ Ngon Hơn
      </>
    ),
    description:
      'Máy massage mắt KingTech là "trợ thủ" giúp đôi mắt của bạn được thư giãn đúng nghĩa sau cả ngày dài làm việc với màn hình. Với công nghệ nhiệt ấm, massage khí nén và rung đa điểm, thiết bị nhẹ nhàng xoa dịu vùng mắt. Cải thiện giấc ngủ của bạn',
    priceLabel: "Giá chỉ từ:",
    priceValue: "1.000.000VND",
  },
  {
    id: 3,
    image: "/assets/images/landing/d-hero-banner.png",
    logo: "/assets/images/landing/logo-kingtech-wide.png",
    heading: (
      <>
        Chăm Sóc Đôi Mắt Mỗi Ngày <br />
        Massage Êm, Ngủ Ngon Hơn
      </>
    ),
    description:
      'Máy massage mắt KingTech là "trợ thủ" giúp đôi mắt của bạn được thư giãn đúng nghĩa sau cả ngày dài làm việc với màn hình. Với công nghệ nhiệt ấm, massage khí nén và rung đa điểm, thiết bị nhẹ nhàng xoa dịu vùng mắt. Cải thiện giấc ngủ của bạn',
    priceLabel: "Giá chỉ từ:",
    priceValue: "1.000.000VND",
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDE_COUNT);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNext, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <section className="relative w-full aspect-[1600/618] overflow-hidden">
      {/* Carousel track */}
      <div
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-full shrink-0">
            {/* Background image */}
            <Image
              src={slide.image}
              alt="KingTech eye massager product"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />

            {/* Content overlay */}
            <div className="absolute inset-0 z-10">
              {/* Logo */}
              <div className="absolute left-[6.25%] top-[23.95%] w-[12.5%] aspect-[200/46]">
                <Image
                  src={slide.logo}
                  alt="KingTech logo"
                  fill
                  className="object-contain"
                  sizes="12.5vw"
                />
              </div>

              {/* Text content block */}
              <div className="absolute left-[6.5%] top-[35.28%] w-[41.0625%] flex flex-col gap-[0.375rem]">
                <h1 className="text-[2.5rem] font-[800] leading-[1.5] tracking-[0.0625rem] uppercase font-[family-name:var(--font-family-gilroy)] text-white">
                  {slide.heading}
                </h1>
                <p className="text-[0.875rem] font-normal leading-[1.4] font-[family-name:var(--font-family-gilroy)] text-white w-[97%]">
                  {slide.description}
                </p>
              </div>

              {/* Gradient overlay bar */}
              <div className="absolute left-0 top-[70.55%] w-[40.8125%] h-[14.72%] bg-gradient-to-r from-[#166c72] to-[rgba(115,115,115,0)] to-[90.593%]" />

              {/* Price row */}
              <div className="absolute left-[6.5%] top-[73.46%] flex items-center gap-[0.75rem]">
                <p className="text-[1.25rem] font-medium leading-[1.4] font-[family-name:var(--font-family-gilroy)] text-white whitespace-nowrap">
                  {slide.priceLabel}
                </p>
                <p className="text-[2.5rem] font-[800] bg-gradient-to-t from-[#ffc963] from-[30%] to-[#ffecc9] to-[83%] bg-clip-text text-transparent font-[family-name:var(--font-family-gilroy)] whitespace-nowrap">
                  {slide.priceValue}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel arrows */}
      <button
        type="button"
        onClick={goToPrev}
        aria-label="Previous slide"
        className="absolute left-[1.8125%] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-[3rem] h-[3rem] rounded-full bg-black/40 backdrop-blur-[0.15rem] transition-all duration-200 hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 active:scale-[0.95]"
      >
        <ArrowRightIcon className="w-[1.0909rem] h-[1.0909rem] rotate-180 [--fill-0:white]" />
      </button>

      <button
        type="button"
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-[1.9375%] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-[3rem] h-[3rem] rounded-full bg-black/40 backdrop-blur-[0.15rem] transition-all duration-200 hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 active:scale-[0.95]"
      >
        <ArrowRightIcon className="w-[1.0909rem] h-[1.0909rem] [--fill-0:white]" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-[3.56%] left-1/2 -translate-x-1/2 z-20 flex items-center gap-[2px]">
        {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-[5px] rounded-full backdrop-blur-[6px] transition-all duration-300",
              currentSlide === index
                ? "w-[48px] bg-white/82"
                : "w-[24px] bg-black/25 hover:bg-black/40",
            )}
          />
        ))}
      </div>
    </section>
  );
};
