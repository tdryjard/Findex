import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import './SearchByName.css';

const SearchByName = props => {
    const [value, setValue] = useState("");

    const  handleChange = event => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.getName(value.toLowerCase()); // parce que la case n'est pas accepté dans la recherche
    };

    const ButtonHome = () => {
        props.getName('');
        props.getType('');
    };

    return (
      <div>
          <form onSubmit={handleSubmit}>
              <input className="SearchBar" value={value} type='text' id='name' name='name' placeholder="Name or ID" onChange={handleChange}/>
              <img onClick={ButtonHome} className="home" src={require("../image/centrepokemon.png")} alt="Home Page Button"/>
          </form>

      </div>

    );

};


export default SearchByName ;