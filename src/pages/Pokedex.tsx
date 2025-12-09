import { useState, useEffect } from "react";
import { useGetAllPokemonsQuery } from "../services/pokemonApi";
import pokeballImage from "../assets/pokeball.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronLeft,
  faChevronRight,
  faWandMagic,
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

const VIEW_LEGACY_KEY = "pokedex-view-legacy";

const Pokedex = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [search, setSearch] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [pageInput, setPageInput] = useState(String(page + 1));

  const [viewLegacy, setViewLegacy] = useState<boolean>(() => {
    const stored = localStorage.getItem(VIEW_LEGACY_KEY);
    if (stored !== null) {
      return JSON.parse(stored);
    }
    return false;
  });

  const { favorites, toggleFavorite } = useFavorites();
  const { data } = useGetAllPokemonsQuery({});

  useEffect(() => {
    localStorage.setItem(VIEW_LEGACY_KEY, JSON.stringify(viewLegacy));
  }, [viewLegacy]);

  useEffect(() => {
    setPage(0);
  }, [search, showFavoritesOnly]);

  useEffect(() => {
    setPageInput(String(page + 1));
  }, [page]);

  const filteredList = data?.results
    ? data.results.filter((pokemon: { name: string; url: string }) => {
        const matchesSearch = pokemon.name
          .toLowerCase()
          .includes(search.toLowerCase());

        if (showFavoritesOnly) {
          const urlParts = pokemon.url.split("/");
          const id = parseInt(urlParts[urlParts.length - 2]);

          return matchesSearch && favorites.includes(id);
        }

        return matchesSearch;
      })
    : [];

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const paginatedPokemons = filteredList.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

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
          <label htmlFor="search" className="sr-only">
            Buscar Pokémon
          </label>
          <SearchInput
            type="text"
            placeholder="Procurar Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FavoritesButton
            onClick={() => setShowFavoritesOnly((s) => !s)}
            aria-label="Ir para favoritos"
          >
            <FontAwesomeIcon
              icon={faStar}
              color={showFavoritesOnly ? "#ffc300" : "#ddd"}
              aria-hidden="true"
            />
          </FavoritesButton>

          <FavoritesButton
            onClick={() => setViewLegacy((s) => !s)}
            aria-label="Mudar visualizaçao"
            title={
              viewLegacy
                ? "Usar visualização nova"
                : "Usar visualização clássica"
            }
          >
            <FontAwesomeIcon
              icon={faWandMagic}
              aria-hidden="true"
              color={viewLegacy ? "#ffc300" : "#ddd"}
            />
          </FavoritesButton>
        </SearchContainer>
      </Header>
      <Main>
        <PokemonGrid>
          {paginatedPokemons.map((poke: { name: string }) => (
            <PokemonCard
              key={poke.name}
              pokemonIdentifier={poke.name}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              showFavoritesOnly={showFavoritesOnly}
              viewLegacy={viewLegacy}
            />
          ))}
          {paginatedPokemons.length === 0 && (
            <p style={{ color: "#fff", marginTop: "20px" }}>
              Nenhum Pokémon encontrado.
            </p>
          )}
        </PokemonGrid>
      </Main>
      <Footer>
        <FooterContent>
          <FooterSection
            style={{
              visibility: filteredList.length > 0 ? "visible" : "hidden",
            }}
          >
            <span className="hide-mobile">Página</span>
            <label htmlFor="pageIndex" className="sr-only">
              Selecione a pagina
            </label>

            <PageInput
              id={"pageIndex"}
              type="number"
              value={pageInput}
              onChange={handlePageInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleGoToPage()}
              onBlur={handleGoToPage}
              min="1"
              max={totalPages || 1}
            />
            <span className="hide-mobile">de {totalPages || 1}</span>
            <GoButton
              onClick={handleGoToPage}
              aria-label="Ir para página"
              className="hide-mobile"
            >
              Ir
            </GoButton>
          </FooterSection>
          <FooterSection
            style={{
              visibility: filteredList.length > 0 ? "visible" : "hidden",
            }}
          >
            <NavButton
              onClick={() => setPage((old) => Math.max(0, old - 1))}
              disabled={page === 0}
              aria-label="Voltar para última página"
            >
              <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
            </NavButton>
            <NavButton
              onClick={() =>
                setPage((old) => (old + 1 < totalPages ? old + 1 : old))
              }
              disabled={page + 1 >= totalPages}
              aria-label="Avançar para próxima página"
            >
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
            </NavButton>
          </FooterSection>
          <FooterSection
            style={{
              visibility: filteredList.length > 0 ? "visible" : "hidden",
            }}
          >
            <label style={{ marginRight: "10px" }} className="hide-mobile">
              Pokémons por página:
            </label>
            <SelectInput
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleLimitChange}
            >
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

export default Pokedex;
