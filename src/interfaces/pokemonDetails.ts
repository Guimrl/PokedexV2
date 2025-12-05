export interface PokemonDetails {
  id: number;
  name: string;
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}
