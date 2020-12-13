import React, { Component } from 'react';


class BandPage extends Component {
    //band as props
    //populate pocID

    state ={
        band: {
            title: "", 
            description: "", 
            image: "", 
            genres: [],  
            phoneNumber: "", 
            contactInfo: "", 
            city: "", 
            instagramUrl: "",
            youtubeUrl: "",
            pocID: undefined, 
            gigsHistory: undefined, 
            pricePerHour: undefined,
            canCustomizePlaylist: undefined,
            minNoticePeriod: undefined
        }
    }

    componentDidMount () {
        this.setState({band: this.props.band})
    }

    render() {

        const {image, title, city, genres, description, pocID, contactInfo, phoneNumber, instagramUrl, youtubeUrl, canCustomizePlaylist, minNoticePeriod} = this.state.band;
        
        return (
            <main>
                <img src={image} alt=""/>
                <h1>{title}</h1>
                <h3>{city}</h3>
                <ul>
                    {genres.map((genre,i) => {
                        <li key={i}>{genre}</li>
                    })}
                </ul>
                <p>{description}</p>
                <p>Managed by {pocID.username}</p>
                <p>{phoneNumber} / {contactInfo}</p>
                {instagramUrl 
                    ? <Link to={instagramUrl}><img src="/images/instagram-logo.png" width="30px" alt=""/></Link>
                    : null} 
                {youtubeUrl 
                    ? <Link to={youtubeUrl}><img src="/images/youtube-logo.png" width="30px" alt=""/></Link>
                    : null}
                <p><span>Usual price: {this.state.pricePerHour}€ per hour of performance</span></p>
                {canCustomizePlaylist
                    ?   <div> 
                            {title} can play a song of your choice given a minimum of {minNoticePeriod} days notice, how cool is that!
                        </div>
                    : <div>
                        {title} prefer to stick to their own well-rehearsed repertoire and do not accept custom orders
                    </div> }
            </main>
        )
    }
}

export default BandPage;