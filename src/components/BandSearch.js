import React from 'react'

function BandSearch (props) {

    const {handleChange, handleSearchSubmit, bandCities, bandGenres} = props;
    const {city, genre, title } = props.bandSearch;
    
    return (
        <form onSubmit={(e) => handleSearchSubmit(e)}>
            <input list="cities" name="city" placeholder="Choose a city" value={city} onChange={e => handleChange(e)}></input>
            <datalist id="cities">
                {bandCities.map(city => {
                    return <option key={city} value={city}></option>
                })}
            </datalist>
            
            <input list="genres" name="genre" placeholder="Choose a genre" value={genre} onChange={e => handleChange(e)}></input>
            <datalist id="genres">
                {bandGenres.map(genre => {
                    return <option key={genre} value={genre}></option>
                })}
            </datalist>

            <input type="text" name="title" value={title} onChange={e => handleChange(e)} placeholder="Type the name of a band"></input>
            {/* BETTER DYNAMIC SEARCH THEN BUTTON WON'T BE NEEDED */}
            <button type="submit">Search</button> 
        </form>
    )
}

export default BandSearch;
