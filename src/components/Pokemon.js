import React, { useState, useEffect } from 'react';
import Description from './Description';

import styled, {keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';

import './Pokemon.css';


const FadeIn = styled.div`animation: 1s ${keyframes`${fadeIn}`}`;

const Pokemon = (props) => {

    const [id, setId] = useState("");
    const [name,setName] = useState("");
    const [front, setFront] = useState("");
    const [frontShiny, setFrontShiny] =useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [types, setTypes] = useState([]);
    const [moves, setMoves] = useState([]);
    const [stats, setStats] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [img, setImg] = useState("");
    const [showAttaque, setShowAttaque] = useState(false);

    // retourne les types du pokemon
    // ["flying", "fire"] pour Charizard
    const getTypes = (pokemon) => {
        return pokemon.types.map( type => {
            return type.type.name;
        });
    }

    const getName = () => {
        props.getPokemon(name);
    }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
            .then(res => res.json())
            .then(res => {
                    props.getPokemon(res);
                    setName (res.name);
                    setFront(res.sprites.front_default);
                    setFrontShiny(res.sprites.front_shiny);
                    setHeight(parseInt(res.height));
                    setId(res.id);
                    setTypes(getTypes(res)); // pour avoir un tableau des elements pour faciliter l'affichage.
                    setWeight(parseInt(res.weight));
                    setMoves(res.moves);
                    setStats(res.stats);
                    setAbilities(res.abilities);
                    return res
                })
            .then( res => {
                    if(res.id>727) {
                        setImg(res.sprites.front_default);
                    }
                    else{
                        setImg(`https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/${res.name}.gif`);
                    }
                }
            )
            setShowAttaque(false);
    }, [props.name])

    const toggleImage = () => {
        if(id>721){
            setImg(img===frontShiny ? frontShiny : front);
        }
        else {
            setImg(img.includes('shiny') ? `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/${name}.gif` : `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/${name}.gif`);
        }
    }

    return (
        <div className='Search'>
            {name.length?
                <div className="pokemonPage">
                    <FadeIn className="headPokemon">
                        <div className="main">
                            <h3>{name} #{id}</h3>
                            <img onMouseEnter={toggleImage} onMouseLeave={toggleImage} src={img} alt={name}/>
                            <div className="abilities framed">
                                <h4>Abilities</h4>
                                {abilities.map((ability,index) => {
                                    return <p key={index}>{ability.ability.name}</p>
                                })}
                            </div>
                        </div>
                        {id ? <Description getName={props.getName} id={id}/> : "not found yet"}
                    </FadeIn>
                    <FadeIn className="informations framed">
                        <h4>Informations</h4>
                        <div className="stat">
                            <div className="baseStat">
                                <div className="types">
                                    {types.map( (type,index) => {
                                       return <img alt={type} key={index} src={require("../image/types/"+type+".png")}/>
                                    })}
                                </div>
                                <p><span className="statName">Height</span> :<span className="statValue"> {height/10} </span>m </p>
                                <p><span className="statName">Weigth</span> : <span className="statValue"> {weight/10} </span>kg</p>
                            </div>
                            <div className="combatStat">
                                {stats.map((stat,index) => {
                                    return <p key={index}><span className="statName">{stat.stat.name}</span> : <span className="statValue">{stat.base_stat}</span></p>
                                })}
                            </div>
                        </div>

                        { showAttaque ?
                            <div className="active">
                                <div className="moves">
                                    {moves.map((move, index) => {
                                        return index>=4 ? null : (
                                            <FadeIn key={index}>
                                                {move.move.name}
                                            </FadeIn>);
                                    })}
                                </div>
                                <h4 className="buttonMoves" onClick={() => setShowAttaque(!showAttaque)}>Close</h4>
                            </div>
                            :
                            <div className="moves">
                                <h4 className="buttonMoves" onClick={() => setShowAttaque(!showAttaque)}>Attack</h4>
                            </div>
                        }
                    </FadeIn>
                </div>
            :
            null}
        </div>
    )
};

export default Pokemon;
