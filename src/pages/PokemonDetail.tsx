import { useParams } from "react-router-dom";
import { useGetPokemonDetailsQuery } from "../services/pokemonApi";
import { AppContainer } from "../components/App.styles";
import { useState } from "react";

const PokemonDetail = () => {
  const [viewLegacy, setViewLegacy] = useState(false);
  const { id } = useParams();
  const { data } = useGetPokemonDetailsQuery(String(id));
  console.log("data", data);
  return (
    <AppContainer>
      <img
        src={
          viewLegacy
            ? data?.sprites.front_default
            : data?.sprites.other["official-artwork"].front_default
        }
        alt={data?.name}
        width={250}
        height={250}
      />
      <button onClick={() => setViewLegacy((s) => !s)}>teste</button>
    </AppContainer>
  );
};

export default PokemonDetail;
