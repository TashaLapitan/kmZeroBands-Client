import React from 'react'

function GigSearch(props) {

    const {handleChange, handleSearchSubmit, gigCities, query} = props;
    
    return (
        <form onSubmit={(e) => handleSearchSubmit(e)}>
            <input list="cities" name="city" placeholder="Choose a city" value={query} onChange={e => handleChange(e)}></input> <br/>
            <datalist id="cities">
                {gigCities.map(city => {
                    return <option key={city} value={city}></option>
                })}
            </datalist><br/>
            <button className="yes-btn" type="submit">Search</button>
        </form>
    )
}

export default GigSearch;
