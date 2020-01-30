import React, {useState, useEffect} from 'react';
import './compare.css';

const Compare = (props) => {

    const [moyenneStatPoke1, setMoyenneStatPoke1] = useState(0);
    const [moyenneStatPoke2, setMoyenneStatPoke2] = useState(0);
    const [pokemon1, setPokemon1] = useState([]);
    const [pokemon2, setPokemon2] = useState([]);
    const [lvlEnter1, setLvlEnter1] = useState(1);
    const [lvlEnter2, setLvlEnter2] = useState(1);
    const [colorPoke1, setColorPoke1] = useState('scoreDefault');
    const [colorPoke2, setColorPoke2] = useState('');
    const [widthTool1, setWidthTool1] = useState(0);
    const [widthTool2, setWidthTool2] = useState(0);
    
    useEffect(() => {
        let parse;
        let totalStatPoke1 = 0;
        let totalStatPoke2 = 0;
        const stock = props.pokemonTab;
        const stock1 = props.pokemonTab[0];
        setPokemon1(stock1.stats);
        if (stock.length > 1){;
            const stock2 = props.pokemonTab[1];
            setPokemon2(stock2.stats);
        };
        ;
        ;
        pokemon1.map(b => {;
            parse = parseInt(b.base_stat);
            totalStatPoke1 += parse;
        });
;
        pokemon2.map(b => {;
            parse = parseInt(b.base_stat);
            totalStatPoke2 += parse;
        });
        setWidthTool1(Math.round(totalStatPoke1/720*100));
        setWidthTool2(Math.round(totalStatPoke2/720*100));
        setMoyenneStatPoke1(Math.round((totalStatPoke1/720*100)));
        setMoyenneStatPoke2(Math.round((totalStatPoke2/720*100)));
        
        if (moyenneStatPoke1 > moyenneStatPoke2 && stock.length > 1){;
            setColorPoke1("scoreTop");
        }
        else if (moyenneStatPoke2 > moyenneStatPoke1 && stock.length > 1){;
            setColorPoke1("scoreBad");
        };

        if (moyenneStatPoke2 > moyenneStatPoke1){;
            setColorPoke2("scoreTop");
        }

        else{;
            setColorPoke2("scoreBad");
        };
    });

    const takeLvlPoke1 = (event) => {;
            setLvlEnter1(event.target.value);
    };

    const takeLvlPoke2 = (event) => {;
            setLvlEnter2(event.target.value);
    };

    return(
        <div>
            <div className="contentPokeRight">
                {pokemon1 ?
                    <div className="cardPokeRight">
                        <input type="text" className="enterLvl" placeholder="enter lvl" onChange={takeLvlPoke1}/>
                        <div className="scoreContent">
                            <p className="score">{moyenneStatPoke1*lvlEnter1} Pc</p>
                        </div>
                        <img className="imgPokeRightwindow" src={props.pokemonTab[0].sprites.front_default}/>
                        <p className="namePokeRightWindow">{props.pokemonTab[0].name}</p>
                        
                        {pokemon2.length > 0 ?
                        <div className="toolIf">
                        <p className="max">MAX</p>
                        <div className="tool">
                            <div className="tool2" style={{height: `${widthTool1}%`}}>
                               <div className={colorPoke1} style={{height: `100%`}}></div>
                            </div>
                        </div>
                        </div>
                        :
                        null}
                    </div>
                :
                    null}

                {pokemon2.length > 0 ?
                    <div className="cardPokeRight">
                        <input type="text" className="enterLvl" placeholder="enter lvl" onChange={takeLvlPoke2}/>
                        <div className="scoreContent">
                            <p className="score">{moyenneStatPoke2*lvlEnter2} Pc</p>
                        </div>
                        <img className="imgPokeRightwindow" src={props.pokemonTab[1].sprites.front_default}/>
                        <p className="namePokeRightWindow">{props.pokemonTab[1].name}</p>
                        <p className="max">MAX</p>
                        <div className="tool">
                            <div className="tool2" style={{height: `${widthTool2}%`}}>
                                <div className={colorPoke2} style={{height: `100%`}}></div>
                            </div>
                        </div>
                    </div>
                :
                    null}
            </div>
        </div>
        )
}

export default Compare;