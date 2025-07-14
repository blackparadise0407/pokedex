import { gql } from "@apollo/client";

export interface GetPokemonsResponse {
  pokemon_v2_pokemon: Pokemon[];
}

export interface GetPokemonByIdResponse {
  pokemon_v2_pokemon: Pokemon[];
  pokemon_v2_pokemonspecies: PokemonSpecies[];
}

export interface GetPokemonEvolutionChainResponse {
  pokemon_v2_evolutionchain: PokemonEvolutionChain[];
}

export const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemontypes {
        type_id
        pokemon_v2_type {
          name
        }
      }
      pokemon_species_id
      order
    }
    pokemon_v2_pokemonspecies(where: { id: { _eq: $id } }) {
      id
      evolution_chain_id
      pokemon_v2_pokemonspeciesflavortexts(
        where: { language_id: { _eq: 9 } }
        limit: 1
      ) {
        flavor_text
      }
    }
  }
`;

export const GET_EVOLUTION_CHAIN_BY_ID = gql`
  query GetEvolutionChainById($id: Int!) {
    pokemon_v2_evolutionchain(where: { id: { _eq: $id } }) {
      pokemon_v2_pokemonspecies(order_by: { id: asc }) {
        id
        name
        pokemon_v2_pokemonevolutions {
          min_level
        }
      }
    }
  }
`;

export const GET_POKEMONS = gql`
  query GetPokemons($offset: Int!) {
    pokemon_v2_pokemon(limit: 50, offset: $offset) {
      id
      name
      pokemon_v2_pokemontypes {
        type_id
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonforms {
        name
      }
    }
  }
`;
