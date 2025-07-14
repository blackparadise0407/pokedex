import { useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";

import { PokemonDetail, PokemonList } from "./components";
import PokemonProvider from "./contexts/PokemonContext";
import {
  GET_POKEMONS,
  type GetPokemonsResponse,
} from "./lib/apollo/queries/pokemon";

const BOTTOM_OFFSET = 1000;

function App() {
  const loadingRef = useRef(false);
  const pageRef = useRef(0);
  const { data, fetchMore } = useQuery<GetPokemonsResponse>(GET_POKEMONS, {
    variables: { offset: 0 },
  });

  const handleLoadMore = async () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const bottomPosition = document.documentElement.scrollHeight;

    if (
      scrollPosition >= bottomPosition - BOTTOM_OFFSET &&
      !loadingRef.current
    ) {
      loadingRef.current = true;
      await fetchMore({
        variables: { offset: (pageRef.current + 1) * 50 },
        updateQuery(prevData, { fetchMoreResult }) {
          return {
            pokemon_v2_pokemon: [
              ...prevData.pokemon_v2_pokemon.slice(),
              ...fetchMoreResult.pokemon_v2_pokemon,
            ],
          };
        },
      });
      pageRef.current += 1;
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    document.addEventListener("wheel", handleLoadMore);

    return () => {
      document.removeEventListener("wheel", handleLoadMore);
    };
  }, []);

  return (
    <main className="relative w-full px-[10vw]">
      <img
        className="fixed top-0 left-0 -translate-x-1/3 -translate-y-1/4 -z-[1]"
        src="/pokeball-icon.png"
      />
      <PokemonProvider>
        <div className="pt-10">
          <PokemonList data={data?.pokemon_v2_pokemon} />
        </div>
        <PokemonDetail />
      </PokemonProvider>
    </main>
  );
}

export default App;
