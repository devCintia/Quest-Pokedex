import { render, screen, waitFor } from '@testing-library/react';
import Pokelist from './Pokelist';
import { BrowserRouter } from 'react-router-dom';

// Simula erro no fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('Erro simulado no fetch'))
  );
});

test('exibe erro no console se o fetch falhar', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  render(
    <BrowserRouter>
      <Pokelist />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Erro ao buscar pokémons:'),
      expect.any(Error)
    );
  });

  consoleSpy.mockRestore();
});
