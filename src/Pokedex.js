import React, { useState, useEffect } from 'react';
import Pokecard from './Pokecard';
import axios from 'axios';
import './Pokedex.css';

const Pokedex = () => {
	const [ pokemon, setPokemon ] = useState([]);
	const [ pokemonDes, setPokemonDes ] = useState('');
	const [ poki, setPoki ] = useState('');
	const [ query, setQuery ] = useState('zapdos');
	const [ isError, setError ] = useState(false);
	useEffect(
		() => {
			const getPokemon = async () => {
				try {
					let response = await axios.get(
						`https://pokeapi.co/api/v2/pokemon/${query}`
					);
					let description_response = await axios.get(
						`https://pokeapi.co/api/v2/pokemon-species/${query}`
					);
					setPokemon([ response.data ]);
					setPokemonDes([ description_response.data ]);
					setError(false);
				} catch (err) {
					setError(true);
				}
			};

			getPokemon();
		},
		[ query ]
	);
	console.log(isError);

	const handleChange = (evt) => {
		setPoki(evt.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setQuery(poki.toLocaleLowerCase());
	};

	return (
		<div className="Pokedex">
			<div className="top">
				<h1>Pokedex App</h1>
				<form action="" onSubmit={handleSubmit}>
					<input
						placeholder="Pokemon"
						type="text"
						value={poki}
						onChange={handleChange}
					/>
				</form>
			</div>
			<div className="cardholder">
				{pokemon[0] && pokemonDes[0] && !isError && query ? (
					<Pokecard
						name={pokemonDes[0].name}
						description={
							pokemonDes[0].flavor_text_entries[0].flavor_text
						}
						height={pokemon[0].height}
						types={pokemon[0].types}
						habitat={pokemonDes[0].habitat.name}
						isLegendary={pokemonDes[0].is_legendary}
						img={pokemon[0].sprites.front_default}
					/>
				) : (
					<p>Type the name of the pokemon!</p>
				)}
			</div>
		</div>
	);
};

export default Pokedex;
