import React, { Component } from 'react';
import bandService from './../lib/bands-service';

class BandPage extends Component {

    state = {
        band: {image: "", 
            title: "", 
            city: "",
            genres: [],
            description: "",
            pocID: {
            username: ""
            },
            contactInfo: "",
            phoneNumber: "",
            instagramUrl: "",
            youtubeUrl: "",
            canCustomizePlaylist: undefined,
            minNoticePeriod: undefined},
        contactInfoShows: false
    }

    getBand = () => {
        const endpoint = this.props.match.params.endpoint;
        bandService.getAllBands() 
        .then(response => {
            const allBands = response.data;
            const foundBand = allBands.find(band => {
                return band.endpoint === endpoint;
            })
            this.setState({band: foundBand})
        })
    }

    toggleContactInfo = () => {
        this.setState({contactInfoShows: !this.state.contactInfoShows})
    }

    componentDidMount () {
        this.getBand();
    }

    render() {

        const {image, title, city, genres, description, pocID, contactInfo, pricePerHour, phoneNumber, instagramUrl, youtubeUrl, canCustomizePlaylist, minNoticePeriod} = this.state.band;
        
        return (
            <main>
                <img src={image} alt=""/>
                <h1>{title}</h1>
                <h3>{city}</h3>
                <ul>
                    {genres.map(genre => {
                        return <li key={genre}>{genre}</li>
                    })}
                </ul>
                <p>{description}</p>
                <p>Managed by {pocID.username}</p>
                {instagramUrl 
                    ? <a href={instagramUrl}><img src="/images/instagram-logo.png" width="30px" alt=""/></a>
                    : null} 
                {youtubeUrl 
                    ? <a href={youtubeUrl}><img src="/images/youtube-logo.png" width="30px" alt=""/></a>
                    : null}
                <p><span>Usual price: {pricePerHour}€ per hour of performance</span></p>
                {canCustomizePlaylist
                    ?   <div> 
                            {title} can play a song of your choice given a minimum of {minNoticePeriod} days notice, how cool is that!
                        </div>
                    : <div>
                        {title} prefer to stick to their own well-rehearsed repertoire and do not accept custom orders
                    </div> }

                {this.state.contactInfoShows
                ? <div>
                    <p>Phone: {phoneNumber}</p>
                    <p>Other info: {contactInfo}</p>
                </div>
                : <button onClick={this.toggleContactInfo}>Contact</button>}
                
            </main>
        )
    }
}

export default BandPage;