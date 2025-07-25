import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeContext } from '../../Context/ThemeContext';
import './PokemonDetails.css';
import styled from 'styled-components';

const InfoSection = styled.section`
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  text-align: center;
  // background-color: #ffffff;
  // color: #333;
  // border-radius: 10px;
  // box-shadow: 0 0 10px #00000010;
  
  @media (prefers-color-scheme: dark) {
    background-color: #2c2c2c;
    color: #f9f9f9;
  }

   ul {
    list-style: none;
    padding-left: 0;
    margin-bottom: 80px;
  }

  li {
   text-align: center;
   font-size: 1.2rem;
  }
`;



const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const { toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setPokemon(data);

      // Pega descrições das habilidades
      const abilitiesWithDescriptions = await Promise.all(
        data.abilities.map(async (ab) => {
          const res = await fetch(ab.ability.url);
          const abData = await res.json();
          const description = abData.effect_entries.find(
            (entry) => entry.language.name === 'en'
          );
          return {
            name: ab.ability.name,
            description: description ? description.effect : 'No description',
          };
        })
      );

      setAbilities(abilitiesWithDescriptions);
    }

    fetchPokemon();
  }, [name]);

  if (!pokemon) return <p>Carregando...</p>;
  return (
    <InfoSection>
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        Alternar Tema
      </button>

      <Link to="/" className="back-link">← Voltar</Link>

      <h1 className="pokemon-name">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image-large"
      />

      <h2>Tipo(s)</h2>
      <ul>
        {pokemon.types.map((t) => (
          <li key={t.type.name}>{t.type.name}</li>
        ))}
      </ul>

      <h2>Habilidades</h2>
      <ul>
        {abilities.map((ab) => (
          <li key={ab.name}>
            <strong>{ab.name}</strong>: {ab.description}
          </li>
        ))}
      </ul>

      <h2>Movimentos</h2>
      <ul className="moves-list">
        {pokemon.moves.map((m) => (
          <li key={m.move.name}>{m.move.name}</li>
        ))}
      </ul>
    </InfoSection>
  );
};

export default PokemonDetails;
