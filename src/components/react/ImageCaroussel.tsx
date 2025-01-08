import { markdownify } from "@/lib/utils/textConverter";
import React from "react";
import { useRef, useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/swiper.scss";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export type ImageCarousselProps = {
    images: { url: string; alt?: string }[];
}

const ImageCaroussel = ({ images }: ImageCarousselProps) => {
    SwiperCore.use([Pagination]);
    const [swiper, setSwiper] = useState<SwiperCore>();
    const paginationRef = useRef(null);

    return (
        <div className="relative w-full h-full rounded-md overflow-hidden">
            <Swiper
                className="w-full h-full"
                pagination={{
                    type: "bullets",
                    el: paginationRef.current,
                    clickable: true,
                    dynamicBullets: true,
                }}
                onSwiper={(swiper) => {
                    setSwiper(swiper);
                }}
                loop={true}
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
            >
                {images.map((image, i) => (
                    <SwiperSlide key={"image-" + i}>
                        <img
                            src={image.url}
                            alt={image.alt}
                            className="object-contain w-full h-full "
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="relative flex justify-center rounded">
                <div
                    className="swiper-pagination reviews-carousel-pagination !bottom-2"
                    style={{ width: "100%" }}
                    ref={paginationRef}
                ></div>
            </div>
        </div>
    );
};

export default ImageCaroussel;
