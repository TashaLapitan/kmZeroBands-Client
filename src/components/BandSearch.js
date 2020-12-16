import React from 'react'

function BandSearch (props) {

    const {handleChange, handleSearchSubmit, bandCities, bandGenres} = props;
    const {city, genre, title } = props.bandSearch;
    
    return (
        <>
        <h2>Search for a band in your area</h2>
        <form onSubmit={(e) => handleSearchSubmit(e)} id="band-search" >
            <input className="search-input" list="cities" name="city" placeholder="Choose a city" value={city} onChange={e => handleChange(e)}></input>
            <datalist id="cities">
                {bandCities.map(city => {
                    return <option key={city} value={city}></option>
                })}
            </datalist>
            
            <input className="search-input" list="genres" name="genre" placeholder="Choose a genre" value={genre} onChange={e => handleChange(e)}></input>
            <datalist id="genres">
                {bandGenres.map(genre => {
                    return <option key={genre} value={genre}></option>
                })}
            </datalist>

            <input className="search-input" type="text" name="title" value={title} onChange={e => handleChange(e)} placeholder="Type the name of a band"></input>
        </form>
        </>
    )
}

export default BandSearch;
