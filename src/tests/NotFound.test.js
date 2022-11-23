import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente `NotFound.js`', () => {
  test('Teste se a página contém um heading `h2` com o texto `Page requested not found`', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/404'));

    const title = screen.getByRole('heading', {
      name: 'Page requested not found',
      level: 2,
    });

    expect(title).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/404'));

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(history.location.pathname).toBe('/404');
  });
});
