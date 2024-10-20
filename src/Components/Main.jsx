import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Main = () => {
    const [pokemonsData, setPokemonsData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
            .then(response => response.json())
            .then(data => {
                const items = data.results.map(pokemon => (
                    { "name": pokemon.name }
                ));

                const pokemonPromises = items.map(element => 
                    fetch(`https://pokeapi.co/api/v2/pokemon/${element.name}/`)
                        .then(response => response.json())
                        .then(data => ({
                            name: element.name,
                            image: data.sprites.front_default,
                            types: data.types.map(type => type.type.name).join(", "),
                            abilities: data.abilities.map(ability => ability.ability.name).join(", "),
                        }))
                );

                Promise.all(pokemonPromises)
                    .then(results => {
                        setPokemonsData(results);
                    });
            });
    }, []);

    return (
        <div className="container">
            {pokemonsData.length > 0 ? (
                pokemonsData.map(item => (
                    <div className="container pokemon">
                        <img src={item.image} alt={item.name} />
                        <strong>Name: {item.name}</strong>
                        <p>Types: {item.types}</p>
                        <p>Abilities: {item.abilities}</p>
                        <button className="btn btn-primary btn-go" onClick={() => navigate(`${item.name}`)}>Go to page {item.name}</button>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Main;
