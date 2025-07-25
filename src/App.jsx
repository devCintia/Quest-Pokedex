import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Pokelist from './components/PokeList/Pokelist';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pokelist />} />
      <Route path="/pokemon/:name" element={<PokemonDetails />} />
    </Routes>
  );
}

export default App;
