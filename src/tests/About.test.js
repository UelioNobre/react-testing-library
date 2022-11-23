import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/about'));
    const title = await screen.findByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    const img = await screen.getByRole('img');
    const paragraph1 = await screen.findByText(/this application simulates/i);
    const paragraph2 = await screen.findByText(/one can filter Pokémon/i);

    expect(history.location.pathname).toBe('/about');

    expect(title).toBeInTheDocument();
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toHaveAttribute('alt', 'Pokédex');
  });
});
