export const accentVars = [
  "--cat-signal",
  "--cat-aqua",
  "--cat-violet",
  "--cat-ember",
  "--cat-rose",
  "--cat-lime",
] as const;

const categoryAccent: Record<string, string> = {
  Languages: "--cat-signal",
  Frontend: "--cat-aqua",
  "Backend & APIs": "--cat-violet",
  "AI / ML & Data": "--cat-ember",
  "XR & Game Development": "--cat-rose",
  "DevOps & Infrastructure": "--cat-lime",
};

export function accentForCategory(category: string) {
  return categoryAccent[category] ?? "--cat-signal";
}

export function accentForTag(tag: string) {
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) % 997;
  return accentVars[h % accentVars.length]!;
}

/** Flat chip styling: category hex text on a 14% tint of the same hex. */
export function chipStyle(cssVar: string) {
  return {
    color: `var(${cssVar})`,
    backgroundColor: `color-mix(in oklab, var(${cssVar}) 14%, transparent)`,
    borderColor: `color-mix(in oklab, var(${cssVar}) 28%, transparent)`,
  } as const;
}
