import { useGetPokemonsQuery } from "../services/pokemonApi";

const App = () => {
  const { data: pokemons, isLoading } = useGetPokemonsQuery({ limit: 151 });

  if (isLoading) return <div>Carregando Pokedex...</div>;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {pokemons?.map((poke: any) => (
          <div
            key={poke.name}
            onClick={() => {}}
            style={{
              cursor: "pointer",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
          >
            <img
              src={poke.image}
              alt={poke.name}
              width={80}
              height={80}
              loading="lazy"
            />
            <p style={{ textTransform: "capitalize", fontWeight: "bold" }}>
              {poke.name}
            </p>
            <small>#{poke.id}</small>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
