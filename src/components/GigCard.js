import React, { Component } from 'react'

class GigCard extends Component {

    //user = props.user

    state = { 
        gig: {
            title: "",
            description: "",
            city: "",
            date: undefined,
            genre: "",
            durationHours: undefined,
            pricePerHour: undefined
        },
        user: {
            username: "",
            phoneNumber: ""
        }
    }

    componentDidMount () {
        console.log('this.props', this.props)
        this.setState({gig: this.props.gig, user: this.props.gig.clientID})
    }    

    render() {

        function formatDate (dateObj) {
            const dateOfGig = new Date(dateObj);
            let dateToShow = dateOfGig.toString().slice(4,15);
            dateToShow = dateToShow.slice(4,7) + dateToShow.slice(0,4) + dateToShow.slice(7, 11);
            return dateToShow;
        }
        
        const {title, city, date, durationHours, pricePerHour, genre, description} = this.state.gig;
        const {username, phoneNumber} = this.state.user;

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
                <p>Posted by: {username}</p>
                <p>Contact: {phoneNumber}</p>
            </div>
        )
    }
}

export default GigCard;
