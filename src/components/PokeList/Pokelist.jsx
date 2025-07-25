import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pokelist.css';

const Pokelist = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(-10);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const limit = 10;

    // Fetch inicial
    useEffect(() => {
        setOffset((prev) => prev + limit);
    }, []);

    // Fetch de pokémons sempre que o offset mudar
    useEffect(() => {
        if (offset < 0) return;

        async function fetchPokemons() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
                const data = await response.json();

                const detailedPokemons = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        return await res.json();
                    })
                );

                setPokemons((prev) => [...prev, ...detailedPokemons]);
            } catch (error) {
                console.error('Erro ao buscar pokémons:', error);
            }
        }

        fetchPokemons();
    }, [offset]);


    // Fetch de tipos de pokémon para o filtro
    useEffect(() => {
        async function fetchTypes() {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/type');
                const data = await res.json();
                setTypes(data.results);
            } catch (error) {
                console.error('Erro ao buscar tipos de pokémon:', error);
            }
        }

        fetchTypes();
    }, []);


    // Função para carregar mais pokémons
    const loadMore = () => {
        setOffset((prev) => prev + limit);
    };

    // Filtro de pokémons por tipo
    const filteredPokemons = selectedType
        ? pokemons.filter((pokemon) =>
            pokemon.types.some((t) => t.type.name === selectedType)
        )
        : pokemons;

    return (
        <div className="container">
            <h1 className="title">Lista de Pokémons</h1>

            <select
                className="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
            >
                <option value="">Todos os tipos</option>
                {types.map((type) => (
                    <option key={type.name} value={type.name}>
                        {type.name}
                    </option>
                ))}
            </select>

            <ul className="pokelist">
                {filteredPokemons.map((pokemon) => (
                    <li key={pokemon.name} className="pokemon-card">
                        <Link to={`/pokemon/${pokemon.name}`} className="pokemon-link">
                            <h2 className="pokemon-name">{pokemon.name}</h2>
                            <img
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                className="pokemon-image"
                            />
                        </Link>
                    </li>
                ))}
            </ul>

            <button className="load-button" onClick={loadMore}>
                Carregar mais
            </button>
        </div>
    );
};

export default Pokelist;
