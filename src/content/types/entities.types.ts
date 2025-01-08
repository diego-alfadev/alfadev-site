import { getEntries, type CollectionEntry, type CollectionKey, type RenderedContent } from "astro:content";
import type { LanguageString } from "../../i18n/types/i18n.types";
// Base type to be truthy when referencing a collection schema
export type WithReference<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: T[P] extends Array<infer U> ? string[] : string;
};

export type Technology = {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  kind?:
    | "frontend"
    | "fullstack"
    | "backend"
    | "devops"
    | "design"
    | "database"
    | "other";
  type: "language" | "framework" | "library" | "tool" | "database" | "runtime";
  url?: string;
  known_since?: string;
  favorite?: boolean;
  ratings?: {
    love?: number;
    knowledge?: number;
  };
};

export type Enterprise = {

  id: string;
  name: string;
  description: LanguageString;
  logo: string;
  url?: string;
  technologies: Technology[];
  active: boolean;
  started_at: string;
  finished_at?: string;


}

export type Project = {
  id: string;
  title: LanguageString;
  description: LanguageString;
  short_description: LanguageString;
  type: "personal" | "professional";
  active: boolean;
  client?: string;
  started_at: string;
  finished_at?: string;
  images?: string[];
  logo?: string;
  site_url?: string;
  repo_url?: string;
  tags: string[];
  technologies: Technology[];
};

export type RoleModel = {
  id: string;
  name: string;
  order?: number;
  description?: LanguageString;
  avatar: string;
  icon?: string;
  color?: string;
  social: {
    name: string;
    url: string;
  }[]
};

export type ContentEntry<T=any> = {
  id: string;
  body?: string;
  collection: CollectionKey;
  data: T;
  rendered?: RenderedContent;
  filePath?: string;
};

export async function fillProjectEntry(project: CollectionEntry<"projects">) {
  const techRefs: { collection: "technologies"; id: string }[] =
    project.data.technologies.map((tech) => ({
      collection: "technologies",
      id: tech,
    }));
  const techs = await getEntries<"technologies">(techRefs);
  return {
    ...project,
    data: {
      ...project.data,
      technologies: techs.map((tech) => tech?.data).filter(Boolean),
    },
  } as ContentEntry<Project>;
}

export async function fillProjectEntries(projects: CollectionEntry<"projects">[]) {
  const filledProjects: ContentEntry<Project>[] = [];
  for (const project of projects) {
    const filled = await fillProjectEntry(project);
    filledProjects.push(filled);
  }
  return filledProjects;
}

export type CollectionReference = {
  collection: CollectionKey;
  id: string;
};


export async function fillEntry<T = any>(
  entry: CollectionEntry<CollectionKey>,
  referenceFields: Record<string, CollectionKey>
) {
  const filledData = {...entry.data};

  for (const [field, collection] of Object.entries(referenceFields)) {
    // console.log(entry.data, field)
    if (Array.isArray(filledData[field])) {
      const refs: CollectionReference[] = filledData[field].map((id: string) => ({
        collection,
        id,
      }));
      const relatedEntries = await getEntries(refs);
      filledData[field] = relatedEntries.map((entry) => entry?.data).filter(Boolean);
    }
  }

  return {
    ...entry,
    data: filledData,
  } as ContentEntry<T>;
}

export async function fillEntries<T = any>(
  entries: CollectionEntry<CollectionKey>[],
  referenceFields: Record<string, CollectionKey>
) {
  const filledEntries: ContentEntry<T>[] = [];
  for (const entry of entries) {
    const filled = await fillEntry(entry, referenceFields);
    filledEntries.push(filled);
  }
  console.log(filledEntries)
  return filledEntries;
}

