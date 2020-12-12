import React from 'react'

function BandInfo(props) {

    const {title, description, phoneNumber, contactInfo, genres, instagramUrl, youtubeUrl, pricePerHour, canCustomizePlaylist, minNoticePeriod } = props.band;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <h2>{props.band.title}</h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
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
                            {genres.map((genre,i) => {
                                return <span key={i}>{genre}</span>
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td>Link to Instagram</td>
                        <td>{instagramUrl}</td>
                    </tr>
                    <tr>
                        <td>Link to YouTube</td>
                        <td>{youtubeUrl}</td>
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
                        <td>€{minNoticePeriod}</td>
                      </tr>
                    : null
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BandInfo;
