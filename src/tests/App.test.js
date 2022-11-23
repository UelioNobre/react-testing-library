import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente App.js', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', async () => {
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

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', async () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = await screen.findByRole('link', { name: 'Home', exact: true });
    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', async () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = await screen.findByRole('link', { name: 'About', exact: true });
    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', async () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = await screen.findByRole('link', { name: 'Favorite Pokémon', exact: true });
    userEvent.click(favoritesLink);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', async () => {
    const { history } = renderWithRouter(<App />);
    const titlePage = 'Page requested not found';

    act(() => history.push('/route-not-found'));

    const heading = await screen.findByRole('heading', {
      name: titlePage,
      level: 2,
    });
    const imagePikachuCrying = await screen.findByAltText(/requested was not found/);

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(titlePage);
    expect(imagePikachuCrying).toBeInTheDocument();
  });
});
