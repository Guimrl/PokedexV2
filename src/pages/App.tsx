import { useState, useEffect } from "react";
import { useGetPokemonsQuery } from "../services/pokemonApi";
import pokeballImage from "../assets/pokeball.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  AppContainer,
  FavoritesButton,
  Footer,
  FooterContent,
  FooterSection,
  GoButton,
  Header,
  Logo,
  LogoContainer,
  Main,
  NavButton,
  PageInput,
  PokemonGrid,
  SearchContainer,
  SearchInput,
  SelectInput,
} from "../components/App.styles";
import { useFavorites } from "../hooks/useFavorites";
import PokemonCard from "./PokemonCard";

const App = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [search, setSearch] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [pageInput, setPageInput] = useState(String(page + 1));

  const { favorites, toggleFavorite } = useFavorites();

  const { data } = useGetPokemonsQuery({
    limit: itemsPerPage,
    offset: page * itemsPerPage,
  });

  const totalPages = data?.count ? Math.ceil(data.count / itemsPerPage) : 0;

  useEffect(() => {
    setPageInput(String(page + 1));
  }, [page]);

  const filteredPokemons = data?.results.filter((pokemon: { name: string }) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());
    if (showFavoritesOnly) {
      return matchesSearch;
    }
    return matchesSearch;
  });

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setPage(0);
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = Number(pageInput) - 1;
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setPage(pageNumber);
    } else {
      setPageInput(String(page + 1));
    }
  };

  return (
    <AppContainer>
      <Header>
        <LogoContainer>
          <Logo src={pokeballImage} alt="Pokeball" />
        </LogoContainer>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Procurar Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FavoritesButton onClick={() => setShowFavoritesOnly((s) => !s)}>
            <FontAwesomeIcon
              icon={faStar}
              color={showFavoritesOnly ? "#ffc300" : "#ddd"}
            />
          </FavoritesButton>
        </SearchContainer>
      </Header>
      <Main>
        <PokemonGrid>
          {showFavoritesOnly
            ? favorites.map((id) => (
                <PokemonCard
                  key={id}
                  pokemonIdentifier={id}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  showFavoritesOnly={showFavoritesOnly}
                />
              ))
            : filteredPokemons?.map((poke: { name: string }) => (
                <PokemonCard
                  key={poke.name}
                  pokemonIdentifier={poke.name}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  showFavoritesOnly={showFavoritesOnly}
                />
              ))}
        </PokemonGrid>
      </Main>
      <Footer>
        <FooterContent>
          <FooterSection show={!showFavoritesOnly}>
            <span>Página</span>
            <PageInput
              type="number"
              value={pageInput}
              onChange={handlePageInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleGoToPage()}
              onBlur={handleGoToPage}
              min="1"
              max={totalPages}
            />
            <span>de {totalPages}</span>
            <GoButton onClick={handleGoToPage}>Ir</GoButton>
          </FooterSection>
          <FooterSection show={!showFavoritesOnly}>
            <NavButton
              onClick={() => setPage((old) => Math.max(0, old - 1))}
              disabled={page === 0}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </NavButton>
            <NavButton
              onClick={() => (!data?.next ? null : setPage((old) => old + 1))}
              disabled={!data?.next}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </NavButton>
          </FooterSection>
          <FooterSection show={true}>
            <label style={{ marginRight: "10px" }}>Pokémons por página:</label>
            <SelectInput value={itemsPerPage} onChange={handleLimitChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </SelectInput>
          </FooterSection>
        </FooterContent>
      </Footer>
    </AppContainer>
  );
};

export default App;
