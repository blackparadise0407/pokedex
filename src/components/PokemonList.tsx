import React from "react";

import { PokemonCard } from ".";

interface PokemonListProps {
  data?: Pokemon[];
}

export const PokemonList = React.memo(function PokemonList({
  data,
}: PokemonListProps) {
  if (!data) return null;

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-x-8 gap-y-20 mr-[500px]">
      {data.map((it) => (
        <PokemonCard key={it.id} data={it} />
      ))}
    </ul>
  );
});
