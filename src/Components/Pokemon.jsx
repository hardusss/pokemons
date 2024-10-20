import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Pokemon = () => {
    const [pokemonData, setPokemonData] = useState(null);
    const { name } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            .then(response => response.json())
            .then(data => {
                const stats = {};
                data.stats.forEach(stat => {
                    stats[stat.stat.name] = stat.base_stat;
                });
                const extractedData = {
                    id: data.id,
                    name: data.name,
                    height: data.height,
                    weight: data.weight,
                    stats: stats,
                    types: data.types.map(type => type.type.name),
                    abilities: data.abilities.map(ability => ability.ability.name).join(", "),
                    sprites: {
                        front: data.sprites.front_default,
                        shiny: data.sprites.shiny,
                    },
                };

                setPokemonData(extractedData);
            })
            .catch(error => console.error("Error fetching Pokémon data:", error));
    }, [name]);

    return (
        <div className="container">
            <i class="bi bi-arrow-left" onClick={() => navigate(-1)} style={{"position": "absolute", left: '50px', fontSize: "30px", cursor: "pointer"}}></i>
            {pokemonData ? (
                <div className="pokemon">
                    <img src={pokemonData.sprites.front} alt={pokemonData.name} />
                    <strong>Name: {pokemonData.name}</strong>
                    <p>ID: {pokemonData.id}</p>
                    <p>Height: {pokemonData.height} m</p>
                    <p>Weight: {pokemonData.weight} kg</p>
                    <p>HP: {pokemonData.stats.hp}</p>
                    <p>Attack: {pokemonData.stats.attack}</p>
                    <p>Defense: {pokemonData.stats.defense}</p>
                    <p>Speed: {pokemonData.stats.speed}</p>
                    <p>Types: {pokemonData.types.join(", ")}</p>
                    <p>Abilities: {pokemonData.abilities}</p>
                    
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Pokemon;
