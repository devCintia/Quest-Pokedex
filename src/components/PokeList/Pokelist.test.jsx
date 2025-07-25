import { render, screen, waitFor } from '@testing-library/react';
import Pokelist from './Pokelist';
import { BrowserRouter } from 'react-router-dom';

describe('Pokelist Component', () => {
  // Teste de sucesso
  test('renderiza 10 pokémons na tela', async () => {
    global.fetch = jest.fn((url) => {
      if (url.includes('pokemon?limit=10')) {
        return Promise.resolve({
          json: () => Promise.resolve({
            results: Array.from({ length: 10 }, (_, i) => ({
              name: `pokemon-${i + 1}`,
              url: `https://pokeapi.co/api/v2/pokemon/${i + 1}`,
            }))
          })
        });
      }

      return Promise.resolve({
        json: () => Promise.resolve({
          name: 'mock-pokemon',
          sprites: { front_default: 'https://pokeapi.co/mock-image.png' },
        })
      });
    });

    render(
      <BrowserRouter>
        <Pokelist />
      </BrowserRouter>
    );

    const cards = await waitFor(() => screen.getAllByRole('heading', { level: 2 }));
    expect(cards.length).toBe(10);
    expect(cards[0].textContent).toContain('pokemon-1');
  });

  // Teste de erro
  test('exibe erro no console se o fetch falhar', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    global.fetch = jest.fn(() => Promise.reject(new Error('Falha na API')));

    render(
      <BrowserRouter>
        <Pokelist />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
