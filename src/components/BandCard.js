import React from 'react';
import {Link} from 'react-router-dom';

function BandCard (props) {

    const {title, city, genres, endpoint, image} = props.band;
    return (
        <div className="band-card"> 
            <h3>{title}</h3>
            <p>{city}</p>
            <img src={image} alt="" width="200px"/>
            <aside style={{ display:"flex", alignItems: "center", justifyContent: "space-between"}}>
                <div style={{padding: "0 15px", textAlign: "center"}}>
                        {genres.map(genre => {
                            return <p key={genre}>{genre}</p>
                        })}
                </div>
                <Link to={`/${endpoint}`}><button className="yes-btn">Visit page</button></Link>
            </aside>
        </div>
    )
}

export default BandCard;