import React from 'react';
import './Pokecard.css';

const Pokecard = ({
	name,
	description,
	height,
	types,
	habitat,
	isLegendary,
	img
}) => {
	const capitalize = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
	return (
		<div className="Pokecard">
			<h1>{capitalize(name)}</h1>
			<div className="imgBack">
				<img src={img} alt="" />
			</div>
			<p>{description}</p>
			<p>Height: {height}</p>
			<p>
				Types:{' '}
				{types ? types.map((type) => `${type.type.name} `) : null}
			</p>
			<p>Habitat: {habitat}</p>
			{isLegendary ? 'Legendary' : 'Ordinary'}
		</div>
	);
};

export default Pokecard;
