import { useQuery } from "@apollo/client";
import clsx from "clsx";
import React from "react";

import { clamp, getPokemonImgById, getSpriteById } from "../helpers/common";
import {
  GET_EVOLUTION_CHAIN_BY_ID,
  GET_POKEMON_BY_ID,
  GetPokemonByIdResponse,
  GetPokemonEvolutionChainResponse,
} from "../lib/apollo/queries/pokemon";
import { usePokemonContext } from "../contexts/PokemonContext";
import TypeTag from "./TypeTag";

export const PokemonDetail = React.memo(function PokemonDetail() {
  const { selectedId: id, select } = usePokemonContext();
  const { data: pokemonData, loading } = useQuery<GetPokemonByIdResponse>(
    GET_POKEMON_BY_ID,
    {
      variables: {
        id,
      },
      skip: !id,
    }
  );
  const evolutionChainId =
    pokemonData?.pokemon_v2_pokemonspecies[0].evolution_chain_id;
  const { data: evolutionChainData } =
    useQuery<GetPokemonEvolutionChainResponse>(GET_EVOLUTION_CHAIN_BY_ID, {
      variables: { id: evolutionChainId },
      skip: !evolutionChainId,
    });

  const species =
    evolutionChainData?.pokemon_v2_evolutionchain[0]
      .pokemon_v2_pokemonspecies ?? [];
  const pokemon = pokemonData?.pokemon_v2_pokemon[0];
  const sizePercentage =
    species.findIndex((it) => it.id === pokemon?.id) +
    1 / (!species.length ? 1 : species.length) +
    1;
  return (
    <div
      className={clsx(
        "fixed flex flex-col h-[62vh] w-[30rem] right-[calc(10vw-20px)] border border-neutral-300 bottom-0 bg-white rounded-xl shadow-2xl",
        !id && "justify-center"
      )}
    >
      <img
        className={clsx(
          "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(50%+20px)]"
        )}
        style={{
          width: "auto",
          height: clamp(0, 350, !loading ? (pokemon?.height || 10) * 20 : 200),
        }}
        width={!loading ? 75 * sizePercentage : 150}
        onLoad={(e) => {
          if (pokemon) {
            e.currentTarget.style.imageRendering = "pixelated";
          }
        }}
        src={
          !pokemon
            ? "/no-pokemon-selected-image.png"
            : getSpriteById(pokemon.id)
        }
        alt=""
      />
      {!id ? (
        <p className="text-gray-400 text-lg font-medium text-center">
          Select a Pokemon to display here.
        </p>
      ) : (
        <>
          {pokemon && (
            <div className="p-5 pt-32 space-y-3 text-center">
              <div className="font-semibold text-gray-400 text-sm">
                N°{pokemon.order}
              </div>
              <div className="font-semibold text-gray-900 text-2xl capitalize">
                {pokemon.name}
              </div>
              <div className="flex gap-3 justify-center">
                {pokemon.pokemon_v2_pokemontypes?.map((it) => (
                  <React.Fragment key={it.type_id}>
                    <TypeTag data={it.pokemon_v2_type} />
                  </React.Fragment>
                ))}
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">
                  Pokedex entry
                </div>
                <p
                  className="font-medium text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html:
                      pokemonData.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts?.[0].flavor_text.replaceAll(
                        "\f",
                        "<br />"
                      ) ?? "",
                  }}
                ></p>
              </div>
              <div className="flex flex-wrap gap-4 items-end justify-center">
                {species.map((it) => (
                  <React.Fragment key={it.id}>
                    {pokemon.id === it.id ? null : (
                      <>
                        <div className="flex flex-col items-center gap-2">
                          {it.pokemon_v2_pokemonevolutions?.[0] && (
                            <div className="bg-gray-200 w-fit px-2 py-1 text-sm font-medium rounded-full">
                              Lv.{" "}
                              {it.pokemon_v2_pokemonevolutions[0].min_level ??
                                "?"}
                            </div>
                          )}
                          <img
                            className="h-20 w-20 rounded-3xl object-cover hover:bg-gray-50 transition-colors cursor-pointer"
                            src={getPokemonImgById(it.id)}
                            style={{ imageRendering: "pixelated" }}
                            onClick={() => select(it.id)}
                          />
                        </div>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
});
