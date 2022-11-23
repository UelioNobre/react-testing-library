import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

const FAVORITE_URL = '/favorites';

describe('Teste o componente `FavoritePokemon.js`', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(FAVORITE_URL));

    const title = screen.getByRole('heading', {
      name: 'Favorite Pokémon',
      level: 2,
    });
    const text = screen.getByText('No favorite Pokémon found');

    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de Pokémon favoritados', async () => {
    const { history } = renderWithRouter(<App />);
    const pokemons = pokemonList.map(({ id, name, type, image, averageWeight }) => (
      { id, name, type, image, averageWeight }));

    // navegar para a página dos pokemons e adicionar para favoritos
    pokemons.forEach((pokemon) => {
      act(() => history.push(`/pokemon/${pokemon.id}`));
      const checkboxFavorites = screen.getByRole('checkbox');
      userEvent.click(checkboxFavorites);
    });

    // navegar até a pasta de favoritos.
    act(() => history.push(FAVORITE_URL));
    expect(history.location.pathname).toBe(FAVORITE_URL);

    // titulos
    const titulos = await screen.findAllByTestId('pokemon-name');
    titulos.forEach((titulo, idx) => {
      expect(titulo.innerHTML).toBe(pokemons[idx].name);
    });

    // tipos
    const types = await screen.findAllByTestId('pokemon-type');
    types.forEach((type, idx) => {
      expect(type.innerHTML).toBe(pokemons[idx].type);
    });

    const weights = screen.getAllByTestId('pokemon-weight');

    // peso e imagens
    pokemons.forEach((pokemon, idx) => {
      const img = screen.getByAltText(`${pokemon.name} sprite`);
      const weight = weights[idx];

      const { averageWeight } = pokemon;
      const pokemonWeight = Object.values(averageWeight).join(' ');

      expect(weight).toBeInTheDocument();
      expect(weight.innerHTML).toBe(`Average weight: ${pokemonWeight}`);

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', pokemon.image);
      expect(img).toHaveAttribute('alt', `${pokemon.name} sprite`);
    });
  });
});
