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
                <h1>{title}</h1>
                <h3>{city}</h3>
                <secion id="band-container">
                    <img src={image} alt="" width="450"/>
                    <div>
                        <ul>
                            {genres.map(genre => {
                                return <li key={genre}>{genre}</li>
                            })}
                        </ul>
                        <p>{description}</p>
                        <p>Managed by {pocID.username}</p>
                        <p>Usual price: {pricePerHour}€ per hour of performance</p>
                        {canCustomizePlaylist
                        ?   <p className="custom-pl-flag"> 
                                {title} can play a song of your choice <br/>given a minimum of {minNoticePeriod} days notice, how cool is that!
                            </p>
                        : <p className="custom-pl-flag">
                            {title} prefer to stick to their own well-rehearsed repertoire <br/>and do not accept custom orders
                        </p> }
                    </div>
                </secion>
                {this.state.contactInfoShows
                        ? <div>
                            <p>Phone: {phoneNumber}</p>
                            <p>Other info: {contactInfo}</p>
                        </div>
                        : <button className="yes-btn" onClick={this.toggleContactInfo} style={{margin: "50px 0"}}>Contact</button>}
                
                <div className="medialinks">
                    {instagramUrl 
                        ? <a href={instagramUrl}><img src="/images/instagram-logo.png" width="30px" alt=""/></a>
                        : null} 
                    {youtubeUrl 
                        ? <a href={youtubeUrl}><img src="/images/youtube-logo.png" width="30px" alt=""/></a>
                        : null}   
                </div>     
            </main>
        )
    }
}

export default BandPage;