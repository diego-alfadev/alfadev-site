import type { Project } from '@/content/types/entities.types'
import React from 'react'
import { SwiperSlide } from 'swiper/react'
import Caroussel from './Caroussel'

function ProjectsCaroussel(props: { projects: Project[] }) {
    return (
        <Caroussel>
            {props.projects.map((project) => (
                <SwiperSlide key={project.id}>
                    <p>{typeof project.title == 'object' ? project.title.es : project.title}</p>
                </SwiperSlide>
            ))}
        </Caroussel>
    )
}

export default ProjectsCaroussel
