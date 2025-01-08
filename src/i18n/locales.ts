import { ui_strings_en } from "./langs/en";
import { ui_strings_es } from "./langs/es";
import type { UI } from "./types/i18n.types";

export const languages = {
  en: "English",
  es: "Spanish",
};

export const defaultLang = "es";

export const ui: UI = {
  en: ui_strings_en,
  es: ui_strings_es,
} as const;
