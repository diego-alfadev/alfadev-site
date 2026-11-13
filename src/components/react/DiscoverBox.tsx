import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import React, { type ElementRef, type PropsWithChildren } from 'react'

export type DiscoverBoxProps = {
    image_top: string
    image_bottom: string
    /**
     * The bottom image will be moved up by this factor of its height
     * @default 1/3 So the bottom image will be moved up by 1/3 of its height after moving next to the top image
     */
    underneath_factor?: number
}

function DiscoverBox(props: PropsWithChildren<DiscoverBoxProps>) {

    const [boxHeight, setBoxHeight] = React.useState(0)


    const box_ref = React.useRef<ElementRef<'div'>>(null)
    const bottom_ref = React.useRef<ElementRef<'img'>>(null)

    const { scrollYProgress } = useScroll({
        target: box_ref,
        // the value of scrollYProgress will be between 0 and 1
        // 0 when the center of the target is at the bottom of the viewport
        // 1 when the center of the target is at the center of the viewport
        offset: ['center end', 'center center']
    })

    const translateY = useTransform(scrollYProgress, [0, .8, 1], [-boxHeight, 0, 0])
    const clipDistance = useTransform(scrollYProgress, [0, .8, 1], [100, 0, 0])
    const clipInset = useMotionTemplate`inset(0px 0px ${clipDistance}% 0%)`

    React.useEffect(() => {
        const box = box_ref.current
        const bottom = bottom_ref.current
        if (!box || !bottom) return

        const measure = () =>
            setBoxHeight(box.clientHeight + (bottom.clientHeight * (props.underneath_factor || (1/3))))

        // The bottom image is lazy-loaded: measured before it loads, its height is 0
        // and the closed box shows a gap instead of overlapping the two halves.
        const observer = new ResizeObserver(measure)
        observer.observe(box)
        observer.observe(bottom)
        return () => observer.disconnect()
    }, [props.underneath_factor])


    return (
        <div className="container mb-4">
            <div className="row">

                <div className="col-12 relative p-0" >

                    <motion.img loading='lazy' className="z-10 relative" src={props.image_top} width={"100%"} alt="Placeholder" />
                    <motion.div className="-z-10 w-full p-4" style={{ clipPath: clipInset }} ref={box_ref}>
                        {props.children}
                    </motion.div>
                    <motion.img ref={bottom_ref} loading='lazy' className="z-0 relative" src={props.image_bottom} width={"100%"} alt="Placeholder" style={{ y: translateY }} />

                </div>
            </div>
        </div>
    )
}

export default DiscoverBox

// import { motion, useTransform, useScroll } from 'framer-motion'
// import React, { type ElementRef, type PropsWithChildren } from 'react'

// export type DiscoverBoxProps = {
//     image_top: string
//     image_bottom: string
//     underneath_factor?: number
// }

// function DiscoverBox(props: PropsWithChildren<DiscoverBoxProps>) {
//     const containerRef = React.useRef<ElementRef<'div'>>(null)
//     const contentRef = React.useRef<ElementRef<'div'>>(null)
//     const bottomRef = React.useRef<ElementRef<'img'>>(null)

//     const [boxHeight, setBoxHeight] = React.useState(0)

//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         // the value of scrollYProgress will be between 0 and 1
//         // 0 when the star of the target is at the bottom of the viewport
//         // 1 when the center of the target is at the center of the viewport
//         offset: ['start 20%', 'start start']
//     })

//     // // Calculamos la translación de la imagen inferior
//     // const translateY = useTransform(scrollYProgress, [0, 1], [-boxHeight, 0])

//     // Usamos esto para controlar la altura del contenedor del contenido
//     const contentHeight = useTransform(scrollYProgress,
//         [0,  1],
//         [0, boxHeight]
//     )

//     React.useEffect(() => {
//         if (contentRef.current && bottomRef.current) {
//             setBoxHeight(contentRef.current.clientHeight + (bottomRef.current.clientHeight * (props.underneath_factor || (1 / 3))))
//         }
//     }, [containerRef.current])

//     return (
//         <div className="container mb-4">
//             <div className="row">
//                 <div className="col-12 relative p-0" ref={containerRef}>
//                     {/* Imagen superior */}
//                     <motion.img
//                         loading='lazy'
//                         className="z-40 relative w-full"
//                         src={props.image_top}
//                         alt="Top"
//                     />

//                     {/* Contenedor del contenido con overflow hidden */}
//                     <motion.div
//                         className="relative w-full overflow-hidden"
//                         style={{ height: contentHeight }}
//                     >
//                         {/* Contenido real */}
//                         <div ref={contentRef} className="p-4 z-0">
//                             {props.children}
//                         </div>
//                     </motion.div>

//                     {/* Imagen inferior */}
//                     <motion.img
//                         ref={bottomRef}
//                         loading='lazy'
//                         className="z-30 relative w-full"
//                         src={props.image_bottom}
//                         alt="Bottom"
//                         // layout
//                         // style={{ y: translateY }}
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DiscoverBox
