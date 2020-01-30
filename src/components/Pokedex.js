import React, {useState} from 'react';
import PokemonOfType from './PokemonOfType';
import SearchByName from './SearchByName';
import SearchTypeResult from './SearchTypeResult'
import Title from './Title';
import Pokemon from './Pokemon';
import Compare from './Compare';
import './pokedex.css';
import './SearchTypeResult.css';
import './buttonBottom.css';
import './ButtonHome.css';


function Pokedex () {
    const [pokemon, setPokemon] = useState({});
    const [pokemonTabLeft, setPokemonTabLeft] = useState([]);
    const [pokemonTabRight, setPokemonTabRight] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [leftWindow, setLeftWindow] = useState('leftWindow');
    const [cardPokeTeam, setCardPokeTeam] = useState('cardPokeLeft');
    const [rightWindow, setRightWindow] = useState("rightWindow");

    const takeName = (name) => {
        setName(name);
    }
    
    const select = (id) => {
        setType(id);
    }
    
    const getPokemon = (pokemon) => {
        setPokemon(pokemon);
    }

    const buttonAdd = () => { 
        let newPokemonTab = pokemonTabLeft.length === 6 ? [pokemon, ...pokemonTabLeft.slice(0, -1)] : [...pokemonTabLeft, pokemon];
        setPokemonTabLeft(newPokemonTab);
        setLeftWindow('leftWindow');
        setCardPokeTeam('cardPokeLeft');
    }

    const takeType = type => {
        setType(type);
    }

    const next = () => {
        const id = pokemon.id;
        setName(id + 1);
    }

    const buttonCompare = () => { 
        let newPokemonTabRight = pokemonTabRight.length === 2 ? [pokemon, ...pokemonTabRight.slice(0, -1)] : [...pokemonTabRight, pokemon];
        setPokemonTabRight(newPokemonTabRight);
        setRightWindow("rightWindow");
    }

    const previous = () => {
        const id = pokemon.id;
        setName(id - 1);
    }

    const leftWindowClose = () => {
        setCardPokeTeam('cardPokeTeamClose');
        setLeftWindow('leftWindowClose');
        setTimeout(resetPokemonTab, 2000);
    }

    const resetPokemonTab = () => {
        setPokemonTabLeft([]);
    }

    const rightWindowClose = () => {
        setRightWindow("rightWindowClose");
        setTimeout(resetPokemonTabRight, 2000);
    }

    const resetPokemonTabRight = () => {
        setPokemonTabRight([]);
    }

    return (
        <div>
            <div className="containerAll">
                {pokemonTabLeft.length > 0 ?
                    <div className={leftWindow}>
                        <img className="cross" onClick={leftWindowClose} src={require("../image/croix.png")} alt="cross"/>
                        <div className="contentPokeTeam">
                            {pokemonTabLeft.length ?  pokemonTabLeft.map((p,index) => {
                                    return (
                                        <div key={index} className={cardPokeTeam}>
                                            <p>{p.name}</p>
                                            <img src={p.sprites.front_default} alt="image du pokémon"/>
                                        </div>
                                    )
                                })
                                :
                                null
                            }
                        </div>
                    </div>
                    :
                    null
                }
                <div className="pokedex">
                    <div className="insidePokedex">
                        <div className="headPokedex">
                            <PokemonOfType select={select} getName={takeName}/>
                            <SearchByName getName={takeName} getType={takeType}/>
                        </div>
                        <div className="contentPokedex">
                        {
                            name?
                                <Pokemon name={name} getName={takeName} getPokemon={getPokemon}/>
                                :
                                type?
                                    <SearchTypeResult id={type} getName={takeName}/>

                                    :
                                    <Title/>
                            }
                        </div>
                    </div>
                    <div className="footerPokedex">
                        <div className="footerLeft">
                            {name ?
                                <div className="footerLeftNameAdd">
                                    <button className="buttonAdd" onClick={buttonAdd}>Add team</button>
                                    <img onClick={previous} className="buttonPrevious" src={require("../image/arrow_previous.png")} alt="arrow_previous"/>
                                    <img onClick={next} className="buttonNext" src={require("../image/arrow_next.png")} alt="arrow_next"/>
                                </div>
                                :
                                null}
                            </div>
                            <div className="footerRight">
                                {name ? <button className="buttonCompare" onClick={buttonCompare}>Compare</button> : null}
                            </div>
                        </div>
                    </div>
                    {pokemonTabRight.length > 0 ?
                        <div className={rightWindow}>
                            <img className="cross2" onClick={rightWindowClose} src={require("../image/croix.png")} alt="cross"/>
                            <Compare pokemonTab={pokemonTabRight}/>
                        </div>
                    :
                    null}
                    </div>
            </div>
    )
}
export default Pokedex;