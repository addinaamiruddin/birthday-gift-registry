import React from "react";
import "./Button.css";

function PokemonFetcher() {
  async function fetchData() {
    try {
      const randomNumber = Math.floor(Math.random() * 898) + 1; // Generates random number between 1 and 898 (total number of Pokemon)

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      const data = await response.json();
      const pokemonSprite = data.sprites.front_default; // to get image
      const imgElement = document.getElementById("pokemonSprite");

      imgElement.src = pokemonSprite;
      imgElement.style.display = "block";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <input type="text" id="pokemonName" placeholder="Enter Pokemon name" />
      <button onClick={fetchData}>Fetch Pokemon</button>
      <img src="" alt="Pokemon Sprite" id="pokemonSprite" />
    </div>
  );
}

export default PokemonFetcher;
