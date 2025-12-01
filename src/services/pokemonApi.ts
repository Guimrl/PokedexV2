import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PokemonDetails {
  id: number;
  name: string;
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: ({ limit = 151 }) => `pokemon?limit=${limit}&offset=0`,
      transformResponse: ({ results }) => {
        return results.map((p: { name: string; url: string }) => {
          const splitUrl = p.url.split("/");
          const id = splitUrl[splitUrl.length - 2];

          return {
            name: p.name,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        });
      },
    }),

    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = pokemonApi;
