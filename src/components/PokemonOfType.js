import React from 'react';
import './PokemonOfType.css';


const PokemonOfType = (props) => {
    
    const selected = (event) => {
        props.getName("");
        props.select(event.target.id);
    }

    return (
            <div className="typeButton">
                <img onClick={selected} id="12" className="typePokemon" src={require(`../image/circle/grass.png`)} alt="grass"/>
                <img onClick={selected} id="11" className="typePokemon" src={require(`../image/circle/water.png`)} alt="water"/>
                <img onClick={selected} id="10" className="typePokemon" src={require(`../image/circle/fire.png`)} alt="fire"/>
                <img onClick={selected} id="13" className="typePokemon" src={require(`../image/circle/electric.png`)} alt="electric"/>
                <img onClick={selected} id="2" className="typePokemon" src={require(`../image/circle/fighting.png`)} alt="fighting" />
                <img onClick={selected} id="14" className="typePokemon" src={require(`../image/circle/psychic.png`)} alt="psychic"/>
                <img onClick={selected} id="1" className="typePokemon" src={require(`../image/circle/incolor.png`)} alt="incolor"/>
                <img onClick={selected} id="17" className="typePokemon" src={require(`../image/circle/obscur.png`)} alt="obscur"/>
                <img onClick={selected} id="9" className="typePokemon" src={require(`../image/circle/steel.png`)} alt="steel"/>
                <img onClick={selected} id="18" className="typePokemon" src={require(`../image/circle/fairy.png`)} alt="fairy"/>
                <img onClick={selected} id="16" className="typePokemon" src={require(`../image/circle/dragon.png`)} alt="dragon"/>    
            </div>

    )
}

export default PokemonOfType;