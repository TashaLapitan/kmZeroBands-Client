import React from 'react'

function BandCard (props) {

    //band image is the background image of the card

    const {title, city, genres} = props.band;
    return (
        <div> 
            <h3>{title}</h3>
            <p>{city}</p>
            {genres.map(genre => {
                return <p key={genre}>{genre}</p>
            })}
        </div>
    )
}

export default BandCard;
