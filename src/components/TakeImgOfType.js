import React, {useState, useEffect} from 'react';

const TakeImgOfType = (props) => {
    const [img, setImg] = useState(props.name);

    const takeImg = () => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
            .then(res => res.json())
            .then(res => {
            const nameImg = res.sprites.front_default;
            setImg(nameImg);
            })     
        }

    useEffect(() => {
        takeImg();
    },[props.selection])

    return(
        <div className="pokemonImg">
            <img src={img} alt="front_default"/>
        </div>

    )

}

export default TakeImgOfType;