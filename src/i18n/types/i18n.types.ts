
export type UI = { es: UI_STRINGS; en: UI_STRINGS };

export type LanguageString = string | { [lang in keyof UI]: string };

export type Translated<T> = T extends string
  ? T // Si es un string, no lo traducimos
  : T extends Array<infer U>
    ? Array<Translated<U>> // Si es un objeto, traducimos cada clave
    : T extends LanguageString
      ? string // Si es un LanguageString, obtenemos el string correspondiente al idioma
      : T extends object
        ? { [K in keyof T]: Translated<T[K]> } // Si es un objeto genérico, traducimos cada clave
        : T;

export type UI_STRINGS = {
  readonly home: {
    banner: {
      title: string;
      presentation: string;
      buttons: {
        projects: string;
        linkedin: string;
        github: string;
        cv: string;
      };
    };
    counter: {
      projects: string;
      years: string;
      coffee: string;
      clients: string;
    };

    technologies: {
      title: string;
      description: string;
    };

    companies: {
      title: string;
      description: string;
    };

    projects: {
      title: string;
      description: string;
    };
  };
  readonly about: {
    about: {
      title: string;
      description: string[];
      contact_me: string;
      collaborate: string;
    };
    mission: {
      title: string;
      description: string[];
    };
    role_models: {
      title: string;
      description: string[];
    }
  };
  readonly projects: {
    filters: string;
  };
  readonly project_details: {
    technologies: string;
    roles: string;
    site: string;
  };
};
