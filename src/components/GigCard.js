import React from 'react';

function GigCard(props) {

    const {title, description, city, date, genre, durationHours, pricePerHour} = props.gig;
    const user = props.gig.clientID; 

    function formatDate (dateObj) {
        const dateOfGig = new Date(dateObj);
        let dateToShow = dateOfGig.toString().slice(4,15);
        dateToShow = dateToShow.slice(4,7) + dateToShow.slice(0,4) + dateToShow.slice(7, 11);
        return dateToShow;
    }

    return (
        <div>
            <h2>{title}</h2>
            <ul>
                <li>{city}</li>
                <li>{formatDate(date)}</li>
                <li>{durationHours} hours</li>
                <li>{pricePerHour}€ per hour</li>
                <li>{genre}</li>
            </ul>
            <p>{description}</p>
            <p>Posted by: {user.username}</p>
            <p>Contact: {user.phoneNumber}</p>
        </div>
    )
}

export default GigCard;
