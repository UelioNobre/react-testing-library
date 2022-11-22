import { screen } from '@testing-library/react';
import React from 'react';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('Verifica se há um menu de navegação', async () => {
    renderWithRouter(<App />);

    const navigation = await screen.findByRole('navigation');
    const homeLink = await screen.findByRole('link', { name: 'Home', exact: true });
    const aboutLink = await screen.findByRole('link', { name: 'About', exact: true });
    const favoritesLink = await screen.findByRole('link', { name: 'Favorite Pokémon', exact: true });

    expect(navigation).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });
});
