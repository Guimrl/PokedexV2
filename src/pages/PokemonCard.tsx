import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetPokemonDetailsQuery } from "../services/pokemonApi";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { typeColors } from "../utils/typeColors";
import { useNavigate } from "react-router-dom";

interface PokemonCardProps {
  pokemonIdentifier: string | number;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  showFavoritesOnly: boolean;
  viewLegacy: boolean;
}

const PokemonCard = ({
  pokemonIdentifier,
  favorites,
  toggleFavorite,
  showFavoritesOnly,
  viewLegacy,
}: PokemonCardProps) => {
  const navigate = useNavigate();

  const { data } = useGetPokemonDetailsQuery(String(pokemonIdentifier));

  if (!data) return null;
  if (showFavoritesOnly && !favorites.includes(data.id)) return null;

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

        <FontAwesomeIcon
          icon={faStar}
          onClick={() => toggleFavorite(data.id)}
          style={
            favorites.includes(data.id)
              ? { color: "#ffc300", cursor: "pointer" }
              : { color: "#ddd", cursor: "pointer" }
          }
          aria-hidden="true"
        />
      </div>

      <img
        src={
          viewLegacy
            ? data?.sprites.front_default
            : data?.sprites.other["official-artwork"].front_default
        }
        onClick={() => navigate(`/pokemon/${data.id}`)}
        alt={data.name}
        width={150}
        height={150}
        loading="lazy"
        style={{ cursor: "pointer" }}
      />

      <p style={styles.name}>{data.name}</p>

      <div style={styles.types}>
        {data.types.map((t) => (
          <span
            key={t.type.name}
            style={{
              ...styles.typeBadge,

              backgroundColor: typeColors[t.type.name] || "#555",
            }}
          >
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
  },
  cardLoading: {
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
    padding: "5px",
    display: "flex",
    gap: "20px",
    margin: "5px",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap" as const,
  },
  typeBadge: {
    fontSize: "0.8em",
    padding: "4px 10px",
    borderRadius: "10px",
    color: "#242424",
    fontWeight: "bold",
    textTransform: "capitalize" as const,
  },
};

export default PokemonCard;
