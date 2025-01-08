import { markdownify } from "@/lib/utils/textConverter";
import { defaultLang, ui } from "./locales";
import type { LanguageString, Translated } from "./types/i18n.types";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function getLanguageString(
  string: string | object,
  language: keyof typeof ui = "es",
) {
  return typeof string === "object" ? string[language] : string;
}

export function useTranslations(lang: keyof typeof ui) {
  return ui[lang];
}

export function isLanguageObject(value: any): value is LanguageString {
  if (typeof value === "object" && value !== null) {
    for (const key in value) {
      if (!(key in ui)) return false;
    }
    return true;
  }
  return false;
}

export function useTranslate(lang: keyof typeof ui = "es") {
  async function translate<T>(feld?: T): Promise<Translated<T>> {
    if (Array.isArray(feld)) {
      // Si es un array, traducimos cada elemento recursivamente
      const translated = await Promise.all(feld.map((item) => translate(item)));
      return translated as Translated<T>; // Asumimos que la estructura del array se conserva
    }

    if (typeof feld === "object" && feld !== null) {
      // Si es un objeto
      if (isLanguageObject(feld)) {
        // Si es un LanguageString, obtenemos el string correspondiente al idioma
        return markdownify(getLanguageString(feld, lang)) as Translated<T>;
      } else {
        // Si es un objeto genérico, traducimos cada clave recursivamente
        const translated: Record<string, unknown> = {};
        for (const key in feld) {
          translated[key] = await translate(feld[key]);
        }
        return translated as Translated<T>; // Asumimos que la estructura del objeto se conserva
      }
    }

    // Si es un string o cualquier otro tipo, lo devolvemos sin modificar
    return feld as Translated<T>;
  }

  return translate;
}

export function translatePath(path: string, lang: keyof typeof ui) {
  const langs = Object.keys(ui);

  if (!langs.includes(lang)) {
    throw new Error(`Language ${lang} is not supported`);
  }

  let clear_pathname = path

  console.log(clear_pathname);

  if (clear_pathname === "/") {
    return `/${lang == defaultLang ? "" : lang}`;
  }

  if (langs.includes(clear_pathname.split("/")[1])) {
    const [slash, path_lang, ..._path] = clear_pathname.split("/");
    if (_path.length === 1) {
      clear_pathname = `/${_path[0]}`;
    } else {
      clear_pathname = _path.join("/");
    }
  }

  if(!clear_pathname.startsWith("/") && !clear_pathname.startsWith("./")) {
    clear_pathname = `/${clear_pathname}`;
  }

  console.log(clear_pathname);

  return `${lang == defaultLang ? "" : "/" + lang}${clear_pathname}`;
}
