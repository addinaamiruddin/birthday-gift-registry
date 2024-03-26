import React, { useState } from "react";
import CardItem from "./CardItem";
import "./Cards.css";
import { useEffect } from "react";
import Papa from "papaparse";
import Data from "./testing_data.csv";
import { Link } from "react-router-dom";
import PokemonFetcher from "./PokemonFetcher";

function Cards() {
  const [data, setData] = useState([]);
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parseData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      }).data;
      setData(parseData);
    };
    fetchData();
  }, []);

  const handlePokemonData = (pokemonData) => {
    setPokemonData(pokemonData);
  };

  return (
    <div className="cards">
      <h1>Check out these epic destinations</h1>
      <div className="cards__container">
        <div className="cards_wrapper">
          <ul className="cards__items">
            {data.length
              ? data.map((row, index) => (
                  <CardItem
                    key={index}
                    src={row.src}
                    text={row.text}
                    label={row.label}
                    path={row.path}
                  />
                ))
              : null}
            {pokemonData && (
              <CardItem
                src={pokemonData.sprites.front_default}
                text={`Name: ${pokemonData.name}`}
                label={`Type: ${pokemonData.types[0].type.name}`}
                path={`/pokemon/${pokemonData.id}`}
              />
            )}
          </ul>
          <ul>
            <PokemonFetcher onPokemonData={handlePokemonData} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
