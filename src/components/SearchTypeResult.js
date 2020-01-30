import React, {useState, useEffect} from 'react';
import TakeImgOfType from './TakeImgOfType';
import './SearchTypeResult.css';

import styled, {keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';

const FadeIn = styled.div`animation: 1s ${keyframes`${fadeIn}`}`;

const SearchTypeResult = (props) => {

    const [type, setType] = useState([]);
    const [urlImage, setUrlImage] = useState("");
    const [select, setSelect] = useState("");
    const [isLoading, setIsLoading] =useState(false);

    const selected = () => {
        const selectType = props.id;
        setIsLoading(true);
        fetch(`https://pokeapi.co/api/v2/type/${selectType}`)
        .then(res => res.json())
        .then(res => {
            const pokemonType = res.pokemon;
            setType(pokemonType);
            setSelect(props.id);
            setTimeout(()=> {
                setIsLoading(false);
            }, 1000)
        });
    }

    useEffect(() => {
        setUrlImage(require("../image/backPokedex/backgroundPoke"+props.id+".png"));
        selected();
    }, [props.id]);

    const getName = event => {
        props.getName(event.currentTarget.id);
    };

    return (
        <div id="searchType" className="pokeImg" style={{ backgroundImage: `url(${urlImage})`, backgroundSize: isLoading ? `1000px 1000px` : "", margin: `auto`}}>
            <div className="sk-chase" style={{display: isLoading ? `inline` :`none` , margin: `35% 30%`}}>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
            {
            type.length && select===props.id ?
            type.filter(p => !p.pokemon.name.includes("-"))
                .map(p => {
                return (
                    <FadeIn id={p.pokemon.name} onClick={getName} className="framed type" style={{ visibility : isLoading ? `hidden` : `visible` }}>
                        <h4 className="namePokeList">{p.pokemon.name}</h4>
                        <TakeImgOfType selection={selected} name={p.pokemon.name}/>
                    </FadeIn>
                )
            })
            :
                null
        }
        </div>
    )
}

export default SearchTypeResult;