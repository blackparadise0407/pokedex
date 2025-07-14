import React, { useState } from "react";
import { getPokemonImgById, getSpriteById, getTypeBg } from "../helpers/common";
import { usePokemonContext } from "../contexts/PokemonContext";
import TypeTag from "./TypeTag";

interface PokemonCardProps {
  data: Pokemon;
}

export const PokemonCard = React.memo(function PokemonCard({
  data,
}: PokemonCardProps) {
  const { select } = usePokemonContext();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative text-center p-3 w-full rounded-xl border-2 border-transparent bg-white hover:border-gray-200 shadow-lg transition-shadow cursor-pointer group"
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      onClick={() => select(data.id)}
    >
      <img
        className="w-24 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 group-hover:translate-y-[calc(-50%-10px)] transition-transform"
        loading="lazy"
        src={isHovering ? getSpriteById(data.id) : getPokemonImgById(data.id)}
        style={{ imageRendering: "pixelated" }}
        alt=""
      />
      <div className="mt-6 font-semibold text-gray-400 text-xs">
        N°{data.id}
      </div>
      <div className="mt-3 font-bold text-gray-800 text-lg capitalize">
        {data.name}
      </div>
      <div className="flex mt-3 gap-2 justify-center">
        {data.pokemon_v2_pokemontypes?.map((it) => (
          <React.Fragment key={it.type_id}>
            <TypeTag data={it.pokemon_v2_type} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});
