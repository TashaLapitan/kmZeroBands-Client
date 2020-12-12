import React from 'react'

function GigCard(props) {

    //populate clientID

    const {title, description, genre, durationHours, pricePerHour} = props.gig;
    const user = props.gig.clientID;
    
    return (
        <div>
            <h2>{title}</h2>
            <ul>
                <li>{durationHours} hours</li>
                <li>{pricePerHour}€ per hour</li>
                <li>{genre}</li>
            </ul>
            <p>{description}</p>
        </div>
    )
}

export default GigCard;
