import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PokemonDetails } from "../interfaces/pokemonDetails";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: ({ limit = 20, offset = 0 }) =>
        `pokemon?limit=${limit}&offset=${offset}`,
    }),
    getAllPokemons: builder.query({
      query: () => `pokemon?limit=10000&offset=0`,
    }),

    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetAllPokemonsQuery,
  useGetPokemonDetailsQuery,
} = pokemonApi;
