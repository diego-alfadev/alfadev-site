import React, { useRef, useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
    wrap
} from "framer-motion";
import type { Technology } from "@/content/types/entities.types";

interface ParallaxProps {
    baseVelocity: number;
    technologies: Technology[];
}

function TecnologiesBanner({ baseVelocity = 100, technologies }: ParallaxProps) {

    const containerRef = useRef<HTMLDivElement>(null);
    const baseX = useMotionValue(100);
    const [_0, _100] = [useMotionValue(0), useMotionValue(100)];
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });


    React.useEffect(() => {
        const viewportWidth = window.innerWidth;
        const containerWidth = containerRef.current?.clientWidth
        if (containerWidth && viewportWidth) {
            console.log(containerWidth, viewportWidth);

            if (baseVelocity > 0) {
                _0.set(0);
                _100.set(-(containerWidth - viewportWidth));
                console.log(_0.get(), _100.get());
            } else {
                _100.set(0 - (containerWidth * 0.1));
                _0.set(-(containerWidth - viewportWidth));
                console.log(_0.get(), _100.get());
            }

        }
    }, [containerRef.current]);

    const x = useTransform(baseX, (v) => `${wrap(_0.get(), _100.get(), v)}px`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {


        let moveBy = directionFactor.current * baseVelocity * (delta / 80);


        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);


    });


    const techs = [...technologies.sort((a, b) => Math.floor(Math.random() * 3) - 1), ...technologies.sort((a, b) => Math.floor(Math.random() * 3) - 1)]

    return (
        <div className="flex flex-row flex-nowrap overflow-hidden w-full relative h-28">
            <motion.div
                className="flex flex-row flex-nowrap"
                ref={containerRef}
                style={{ x }}
            >
                {/* Primera copia del contenido */}

                {techs.map((tech, index) => (
                    <span
                        key={`original-${index}`}
                        className="inline-block px-4 w-28 h-28"
                        dangerouslySetInnerHTML={{ __html: tech.icon ?? "" }}
                    />
                ))}

            </motion.div>
        </div>
    );
}

export default TecnologiesBanner;
