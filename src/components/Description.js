import React, {useState, useEffect} from 'react';
import Evolution from "./Evolution";
import './Description.css';

const Description = (props) => {

    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [urlEvolution, setUrlEvolution] = useState("");

    const getDescription = () => {
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+props.id)
            .then(response => response.json())
            .then( data => {
                let textDescription = "";
                // To select the one in english, because our client is an englishman.
                for(let i in data.flavor_text_entries){
                    if(data.flavor_text_entries[i].language.name==="en"){
                        textDescription=data.flavor_text_entries[i].flavor_text;
                    }
                }
                textDescription = textDescription.replace("\n", " ");
                setUrlEvolution(data.evolution_chain.url);
                setDescription(textDescription.split('\u25af').join(''));
                setName(data.name);
            });
    }

    useEffect(() => {
        getDescription();
    }, [props.id])

    return (
        <div className="description">
            { description.length ?
                <div>
                    <div className="framed">
                        <h4>Description</h4>
                        <p>{description}</p>
                    </div>
                    {name ? <Evolution getName={props.getName} name={name} chain={urlEvolution}/>: null}
                </div>
                :
                <div className="NotFound">Not found yet!</div>
            }
        </div>
    );
}


export default Description;
