import { useState } from "react";
import styled from "styled-components";
import { useGetPokemonsQuery } from "../services/pokemonApi";
import pokeballImage from "../assets/pokeball.png";
import { PokemonCard } from "./PokemonCard";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
`;

const Header = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Logo = styled.img`
  height: 3.5rem;
  width: 3.5rem;
`;

const LogoContainer = styled.div`
  width: 30%;
`;

const SearchContainer = styled.div`
  width: 70%;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  margin-left: 2rem;
`;

const Main = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
`;

const App = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isFetching } = useGetPokemonsQuery({
    limit: itemsPerPage,
    offset: page * itemsPerPage,
  });

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setPage(0);
  };

  return (
    <AppContainer>
      <Header>
        <LogoContainer>
          <Logo src={pokeballImage} alt="Pokeball" />
        </LogoContainer>
        <SearchContainer>
          <SearchInput type="text" placeholder="Procurar Pokémon..." />
        </SearchContainer>
      </Header>
      <Main>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data?.results.map((poke: { name: string }) => (
            <PokemonCard key={poke.name} name={poke.name} />
          ))}
        </div>
      </Main>
      <Footer style={{}}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "33%" }}>
            <span style={{ alignSelf: "center", fontWeight: "bold" }}>
              Página {page + 1}
            </span>
          </div>
          <div style={{ width: "33%" }}>
            <button
              onClick={() => setPage((old) => Math.max(0, old - 1))}
              disabled={page === 0}
            >
              Anterior
            </button>

            <button
              onClick={() => setPage((old) => old + 1)}
              disabled={!data?.next}
            >
              Próxima
            </button>
          </div>
          <div style={{ width: "33%" }}>
            <label style={{ marginRight: "10px" }}>Pokémons por página:</label>
            <select
              value={itemsPerPage}
              onChange={handleLimitChange}
              style={{ padding: "5px", borderRadius: "4px" }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Pokedex. Todos os direitos
          reservados.
        </p>
      </Footer>
    </AppContainer>
  );
};

export default App;
