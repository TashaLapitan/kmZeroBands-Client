import {React} from 'react';

function BandInfo(props) {

    const {title, description, city, image, phoneNumber, contactInfo, genres, instagramUrl, youtubeUrl, pricePerHour, canCustomizePlaylist, minNoticePeriod } = props.band;

    return (
        <div>
            <img src={image} alt=""/>
            <table>
                <thead>
                    <tr>
                        <th>
                            <h2>{title}</h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>City: </td>
                        <td>{city}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{description}</td>
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        <td>{phoneNumber}</td>
                    </tr>
                    <tr>
                        <td>Contact Information</td>
                        <td>{contactInfo}</td>
                    </tr>
                    <tr>
                        <td>Genres</td>
                        <td>
                                {genres.map((genre, i, arr) => {
                                    if (i === arr.length-1) {
                                        return <span key={genre}>{genre}</span>
                                    } else {
                                        return <span key={genre}>{genre}, </span>
                                    }
                                    
                                })}
                        </td>
                    </tr>
                    <tr>
                        <td>Price per hour of performance</td>
                        <td>€{pricePerHour}</td>
                    </tr>
                    <tr>
                        <td>Playlist</td>
                        {canCustomizePlaylist ? <td>Clients can order a custom playlist</td> : <td>Cannot perform songs on client's request</td>}
                    </tr>
                    {canCustomizePlaylist 
                    ? <tr>
                        <td>Minimum rehersal time for a new song</td>
                        <td>{minNoticePeriod} days</td>
                      </tr>
                    : null
                    }
                    {instagramUrl || youtubeUrl
                    ? <tr>
                        {instagramUrl 
                        ? <td><a href={instagramUrl} target="_blank"><img src="/images/instagram-logo.png" width="30px" alt=""/></a></td>
                        : <td></td>}
                        {youtubeUrl 
                        ? <td><a to={youtubeUrl} target="_blank"><img src="/images/youtube-logo.png" width="30px" alt=""/></a></td>
                        : <td></td>}                        
                      </tr>
                    : null
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BandInfo;
