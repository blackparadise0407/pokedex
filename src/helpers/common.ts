export const getTypeBg = (name: string) => {
  const typeMap: Record<string, string> = {
    grass: "#78CD54",
    poison: "#AB549A",
    fire: "#FF421C",
    flying: "#669AFF",
    water: "#2F9AFF",
    bug: "#ABBC1C",
    normal: "#BCBCAC",
    electric: "#FFCD30",
    ground: "#DEBC54",
    fairy: "#FFACFF",
    fighting: "#BC5442",
    psychic: "#FF549A",
    rock: "#BCAC66",
    steel: "#ABACBC",
    ice: "#78DEFF",
    ghost: "#6666BC",
    dragon: "#7038F8",
    dark: "#705848",
  };
  return typeMap[name] || "";
};

export const getSpriteById = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;

export const getPokemonImgById = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export const clamp = (min: number, max: number, value: number): number =>
  Math.max(min, Math.min(max, value));
