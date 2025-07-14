declare global {
  interface Pokemon {
    id: number;
    name: string;
    pokemon_species_id: number;
    order: number;
    weight?: number;
    height?: number;
    pokemon_v2_pokemontypes?: Array<{
      type_id: number;
      pokemon_v2_type: PokemonType;
    }>;
    pokemon_v2_pokemonforms?: PokemonForm[];
    pokemon_v2_pokemonabilities?: Array<{
      pokemon_v2_ability: PokemonAbility;
    }>;
  }

  interface PokemonType {
    name: string;
  }

  interface PokemonForm {
    name: string;
  }

  interface PokemonSpecies {
    id: number;
    name: string;
    evolution_chain_id: number;
    pokemon_v2_pokemonspeciesflavortexts?: PokemonSpeciesFlavorText[];
    pokemon_v2_pokemonevolutions?: PokemonEvolution[];
  }

  interface PokemonSpeciesFlavorText {
    flavor_text: string;
  }

  interface PokemonAbility {
    name: string;
  }

  interface PokemonEvolutionChain {
    pokemon_v2_pokemonspecies?: PokemonSpecies[];
  }

  interface PokemonEvolution {
    min_level: number;
  }
}

export {};
