import React from 'react';
import {Link} from 'react-router-dom';

function BandCard (props) {

    //band image is the background image of the card

    const {title, city, genres, endpoint, image} = props.band;
    return (
        <div className="band-card"> 
            <h3>{title}</h3>
            <img src={image} alt="" width="200vw"/>
            <aside style={{ display:"flex", alignItems: "center"}}>
                <div style={{padding: "0 15px", textAlign: "center"}}>
                    <p>{city}</p>
                        {genres.map(genre => {
                            return <p key={genre}>{genre}</p>
                        })}
                </div>
                <Link to={`/${endpoint}`}><button className="yes-btn" style={{margin: "15px"}}>Visit page</button></Link>
            </aside>
        </div>
    )
}

export default BandCard;
