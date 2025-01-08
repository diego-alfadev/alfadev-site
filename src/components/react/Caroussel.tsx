import "@/styles/swiper.scss";
import React, { useRef, useState, type ReactNode } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, type SwiperSlideProps } from "swiper/react";

export type CarousselProps = {
    children: ReactNode | ReactNode[] | { props: { value: string } };

}
/**
 * React element prepared to be used as a generic caroussel.
 *
 * Prepared to be Working with Astro or React children.
 *
 * - Wors as expected **with React** children, **every child needs to be wrapped in a `SwiperSlide`** component.
 *
 * - With Astro children, the component will extract the html content from the children and wrap it in a `SwiperSlide` component.
 * **So the Astro children must be a valid html content and must not be wrapped in a `SwiperSlide` component.**
 *   - The Astro children **must be a list of html elements.**
 *
 * @example using Astro children
 * ```tsx
 * <Caroussel client:load>
 * {array.map((item) => (
 *  <AstroComponent value={item} />
 * ))}
 * </Caroussel>
 * ```
 *
 * @param param0
 * @returns
 */
const Caroussel = ({ children }: CarousselProps) => {
    SwiperCore.use([Pagination]);
    const [swiper, setSwiper] = useState<SwiperCore>();
    const paginationRef = useRef(null);

    const getAstroItemsFromChildren = React.useCallback((children: { props: { value: string } }) => {

        const matches = children.props.value.matchAll(/<([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?>.*?<\/\1>|<([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?\/?>/g)
        const items: string[] = [];
        for (const match of matches) {
            items.push(match[0]);
        }
        return items;
    }, [children])

    if (!children) {
        return <div>Caroussel needs a children prop</div>;
    }
    let html_items: string[] = [];
    if (typeof children === "object" && 'props' in children && 'value' in children.props) {
        html_items = getAstroItemsFromChildren(children);
    }


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
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
            >
                {
                    html_items ? html_items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full h-full p-4 flex items-center justify-center"dangerouslySetInnerHTML={{ __html: item }}></div>
                        </SwiperSlide>
                    )) : children as ReactNode
                }

            </Swiper>
            <div className="relative flex justify-center rounded">
                <div
                    className="swiper-pagination reviews-carousel-pagination"
                    style={{ width: "100%" }}
                    ref={paginationRef}
                ></div>
            </div>
        </div>
    );
};

export default Caroussel;
