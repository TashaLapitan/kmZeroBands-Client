import React from 'react';
import {Link} from 'react-router-dom';

function BandCard (props) {

    //band image is the background image of the card

    const {title, city, genres, endpoint} = props.band;
    return (
        <div> 
            <h3>{title}</h3>
            <p>{city}</p>
            {genres.map(genre => {
                return <p key={genre}>{genre}</p>
            })}
            <Link to={`/${endpoint}`}><button>Visit page</button></Link>
        </div>
    )
}

export default BandCard;
