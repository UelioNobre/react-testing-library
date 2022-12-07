import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test the component "Pokemon" ', () => {
  it('Verifica se as informacoes do pokemon sao exibidas corretamente', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.queryByTestId('pokemon-name');
    const pokemonWeight = screen.queryByTestId('pokemon-weight');
    const pokemonType = screen.queryByTestId('pokemon-type');
    const pokemonImg = screen.getByRole('img', { name: 'Pikachu sprite' });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent(/average weight: 6\.0 kg/i);
    expect(pokemonImg).toBeInTheDocument();
  });

  it('Testa se tem o botao para os detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });
    expect(details).toBeInTheDocument();

    userEvent.click(details);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  it('Testa se abre a página do pokemon especificado', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getAllByRole('link', { name: /More details/i });
    userEvent.click(moreDetails[0]);

    const url = history.location.pathname;
    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonDetails).toBeInTheDocument();
    expect(url).toBe('/pokemon/25');
  });

  it('Testa se o pokemon favorito', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getAllByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsButton[0]);

    const checkboxPokemon = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkboxPokemon);
    expect(checkboxPokemon).toBeChecked();

    const starFavorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starFavorite).toBeInTheDocument();
    expect(starFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(starFavorite.alt).toBe('Pikachu is marked as favorite');

    const pokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.alt).toBe('Pikachu sprite');
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
