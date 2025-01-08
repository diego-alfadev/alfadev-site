import { type PageType } from "@/content/types/page.types";
import { glob } from "astro/loaders";
import {
  defineCollection,
  z
} from "astro:content";
import type {
  Enterprise,
  Project,
  RoleModel,
  Technology,
  WithReference
} from "./types/entities.types";

// Pages collection schema
const pagesCollection = defineCollection({
  type: "content",
  schema: z.custom<PageType>(),
});

const technologiesCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/technologies" }),
  schema: z.custom<Technology>(),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/projects" }),
  schema: z.custom<WithReference<Project, "technologies">>(),
});

const enterprisesCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/enterprises" }),
  schema: z.custom<WithReference<Enterprise, "technologies">>(),
});

const roleModelsCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/role-models" }),
  schema: z.custom<RoleModel>(),
});



// Export collections
export const collections = {
  pages: pagesCollection,
  technologies: technologiesCollection,
  projects: projectsCollection,
  enterprises: enterprisesCollection,
  "role-models": roleModelsCollection,
};
