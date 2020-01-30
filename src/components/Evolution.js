import React, {useState, useEffect} from 'react';
import './Evolution.css';


const Evolution = props => {
    const [chainEvolution, setChainEvolution]= useState([]);

    const getChainEvolution = async () => {
        fetch(props.chain)
            .then(response => response.json())
            .then(data => {
                const chain=data.chain;
                const evolution=[chain.species.name];
                let evolve=chain.evolves_to;
                evolve.map(evo => { // special for Eevee
                    evolution.push(evo.species.name)
                });
                if(chain.evolves_to.length) {
                    if (chain.evolves_to[0].evolves_to.length) {
                        evolution.push(chain.evolves_to[0].evolves_to[0].species.name);
                    }
                }
                setChainEvolution(evolution);
            });
    }

    const getName = event => {
        props.getName(event.currentTarget.id);
    }

    useEffect(()=>{
        getChainEvolution();
    }, [props.name]);

    return (
        <div>
                <div className="framed">
                    <h4>Evolutions</h4>
                    <div className="evolutions">
                        {chainEvolution.length>1 ?
                            chainEvolution
                                .filter(evol => evol !== props.name) // to remove the actual pokémon in the evolution chain.
                                .map((evol, index) => {
                                    return (
                                        <div onClick={getName} key={index} id={evol} className="evolution">
                                            <img
                                                src={`https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/${evol}.gif`}
                                                alt={"Evolution de "+props.name+ " : "+evol}
                                            />
                                        </div>
                                    );
                                })
                            :
                            <p>This pokémon doesn't have an evolution chain.</p>
                        }
                </div>
            </div>
        </div>
    );
}

export default Evolution;
