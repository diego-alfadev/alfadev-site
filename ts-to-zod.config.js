/**
 * ts-to-zod configuration.
 *
 * @type {import("ts-to-zod").TsToZodConfig}
 */
module.exports = [

  {
    name: "i18n",
    input: "src/i18n/types/i18n.types.ts",
    nameFilter: (name) => !name.startsWith("Translated"),
    output: "src/i18n/types/i18n.types.zod.ts"
  },
  {
    name: "pages",
    input: "src/content/types/page.types.ts",
    nameFilter: (name) => !name.startsWith("Generic"),
    output: "src/content/types/page.types.zod.ts"
  },
  {
    name: "entities",
    input: "src/content/types/entities.types.ts",
    output: "src/content/types/entities.types.zod.ts"
  },
];
