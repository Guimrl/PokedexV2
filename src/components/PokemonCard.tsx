import { useGetPokemonDetailsQuery } from "../services/pokemonApi";

export const PokemonCard = ({ name }: { name: string }) => {
  const { data, isLoading } = useGetPokemonDetailsQuery(name);

  if (isLoading) return <div style={styles.cardLoading}>...</div>;
  if (!data) return null;
  console.log(data);
  return (
    <div style={styles.card}>
      <div
        style={{
          borderBottom: "1px solid #ddd",
          boxSizing: "border-box",
          padding: "0 10px 0 10px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <small>#{data.id}</small>
        <p style={styles.name}>{name}</p>
      </div>
      <img
        // src={data.sprites.other["official-artwork"].front_default}
        src={data.sprites.front_default}
        alt={name}
        width={150}
        height={150}
        loading="lazy"
      />

      <div style={styles.types}>
        {data.types.map((t) => (
          <span key={t.type.name} style={styles.typeBadge}>
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    margin: "5px",
    textAlign: "center" as const,
    backgroundColor: "#2a2a2a",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "5px",
    minWidth: "150px",
    minHeight: "220px",
  },
  cardLoading: {
    width: "150px",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  name: {
    textTransform: "capitalize" as const,
    fontWeight: "bold",
    margin: "5px 0",
  },
  types: {
    boxSizing: "border-box",
    padding: "5px",
    display: "flex",
    gap: "25px",
    marginTop: "5px",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap" as const,
  },
  typeBadge: {
    fontSize: "0.7em",
    padding: "2px 8px",
    borderRadius: "10px",
    backgroundColor: "#555",
    color: "white",
    textTransform: "capitalize" as const,
  },
};
