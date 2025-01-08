import type { LanguageString } from "@/i18n/types/i18n.types";
import type { HTMLAttributes } from "astro/types";
import type { IconProps } from "react-feather";
import type { Project } from "./entities.types";




export interface LinkButtonI {
  /**
   * Button text can be provided as a string via the `label` prop or as a child element
   */
  label?: LanguageString;
  /**
   * @enum {("outline" | "solid")} mode - Button style  (default: "solid")
   */
  mode?: "outline" | "solid";
  disabled?: boolean;
  icon?: IconProps["name"];
  iconSize?: IconProps["size"];
  /**
   * Applies to the main button color (background, border, effects)
   * Possible values: in @/config/theme.json
   */
  color?: string;
  addClasses?: string;
}

export type LinkButton = HTMLAttributes<"a"> & LinkButtonI;

export interface PageSection {
  title: LanguageString;
  /**
   * use tailwindcss text size classes
   */
  title_size?: string;
  subtitle?: LanguageString;
  content: LanguageString;
  buttons?: LinkButton[] & { length: 0 | 1 | 2 };
  image?: string;
  /**
   * @enum {("top" | "bottom" | "left" | "right")} image_position - Image position (default: "right")
   */
  image_position?: "top" | "bottom" | "left" | "right";
  image_width?: string;
  image_height?: string;
}

export interface PageConfig {
  /**
   * Applies to the `<title>` tag in the `<head>` of the document.
   * - Falls back to the `title` if not provided
   *   - Falls back to the `site_title` in the `config.json` if not provided
   */
  document_title?: LanguageString;
  /**
   * Applies to some meta tags related to SEO and Social Sharing
   * - og:title
   * - twitter:title
   *
   * Falls back to the `document_title` if not provided
   */
  meta_title?: LanguageString;
  /**
   * Applies to some meta tags
   * - description
   * - og:description
   * - twitter:description
   */
  meta_description?: LanguageString;
  /**
   * Applies to the <meta name="keywords"> tag
   */
  meta_keywords?: LanguageString[];

  /**
   * Applies to the <meta name="author"> tag
   */
  meta_author?: string;

  /**
   * Applies to the <link rel="canonical"> tag
   */
  canonical_url?: string;
  /**
   * Applies to the <meta name="robots"> tag.
   * If true, it will add the 'noindex, nofollow' value.
   * If false, it will add the 'index, follow' value.
   */
  noindex?: boolean;
  /**
   * Applies to the og:image and twitter:image meta tags
   */
  meta_image?: string;
}

export interface PageCommonProps {
  /**
   * Page title displayed on the <PageHeader> component. Used as a fallback for the `<title>` tag when `document_title` is not provided.
   */
  title?: LanguageString;
  /**
   * Page description displayed on the <PageHeader> component
   */
  description?: LanguageString;
  // Limited to 4 buttons
  buttons?: LinkButton[] & { length: 0 | 1 | 2 | 3 | 4 };
  sections?: PageSection[];
}

export type PageType<data_type = any> = PageCommonProps &
  PageConfig & { data?: data_type };
