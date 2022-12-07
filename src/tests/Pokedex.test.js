import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente `Pokedex.js`', () => {
  test('Teste se a página contém um heading `h2` com o texto `Encountered Pokémon`', async () => {
    renderWithRouter(<App />);

    const title = await screen.findByRole('heading', {
      name: /Encountered Pokémon/i,
      level: 2,
    });

    expect(title).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado`', async () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    for (let i = 0; i < 8; i += 1) {
      userEvent.click(nextButton);
    }

    const pokemon = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');

    expect(pokemon.innerHTML).toBe('Dragonair');
    expect(type.innerHTML).toBe('Dragon');
    expect(weight.innerHTML).toContain('Average weight: 16.5 kg');
  });

  test('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    expect(allButton).toHaveTextContent(/all/i);
    expect(filterButtons[0]).toHaveTextContent('Electric');
    expect(filterButtons[1]).toHaveTextContent('Fire');
    expect(filterButtons[2]).toHaveTextContent('Bug');
    expect(filterButtons[3]).toHaveTextContent('Poison');
    expect(filterButtons[4]).toHaveTextContent('Psychic');
    expect(filterButtons[5]).toHaveTextContent('Normal');
    expect(filterButtons[6]).toHaveTextContent('Dragon');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro:', async () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByRole('button', { name: 'All', exact: true });
    expect(resetButton).toBeInTheDocument();
    userEvent.click(resetButton);

    const pokemonType = await screen.findByTestId('pokemon-type', {
      name: 'Electric',
    });
    expect(pokemonType.innerHTML).toBe('Electric');
  });
});
