import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 1rem;
  box-sizing: border-box;
`;

export const Header = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: 1rem;
`;

export const Logo = styled.img`
  height: 3.5rem;
  width: 3.5rem;

  @media screen and (max-width: 768px) {
    height: 2.5rem;
    width: 2.5rem;
  }
`;

export const LogoContainer = styled.div`
  width: 30%;

  @media screen and (max-width: 768px) {
    width: 20%;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
`;

export const SearchInput = styled.input`
  padding: 0.5rem;
  margin-left: 2rem;
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 140px;
  }
`;

export const FavoritesButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  font-size: 1.5rem;
`;

export const Main = styled.main`
  flex: 1;
`;

export const PokemonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  margin-top: 1rem;
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FooterSection = styled.div`
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageInput = styled.input`
  width: 40px;
  padding: 2px 5px;
  margin: 0 10px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SelectInput = styled.select`
  width: 60px;
  padding: 2px 5px;
  margin: 0 10px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const GoButton = styled.button`
  padding: 4px 8px;
  margin-left: 8px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const NavButton = styled.button`
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
