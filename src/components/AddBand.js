import React from 'react';

function AddBand(props) {
    const {handleBandChange, handleBandFormSubmit, showAddBand} = props;

    return (
        <div>
            <form onSubmit={(e) => handleBandFormSubmit(e)}>
                <label>Title: </label> <br/>
                <input type="text" name="title" onChange={handleBandChange}/> <br/>
                <label>Description: </label> <br/>
                <textarea rows="4" cols="50" name="description" onChange={handleBandChange}></textarea> <br/>
                <label>Phone Number: </label> <br/>
                <input type="text" name="phoneNumber" onChange={handleBandChange}/> <br/>
                <label>Contact Info: </label> <br/>
                <textarea rows="4" cols="50" name="contactInfo" onChange={handleBandChange}></textarea> <br/>
                <label>Which genres do you play? </label> <br/>
                <input type="text" name="genre1" onChange={handleBandChange}/> <br/>
                <input type="text" name="genre2" onChange={handleBandChange}/> <br/>
                <input type="text" name="genre3" onChange={handleBandChange}/> <br/>
                <label>Link to Instagram: </label> <br/>
                <input type="text" name="instagramUrl" onChange={handleBandChange}/> <br/>
                <label>Link to YouTube: </label> <br/>
                <input type="text" name="youtubeUrl" onChange={handleBandChange}/> <br/>
                <label>How much do you charge hourly? </label> <br/>
                <input type="number" name="pricePerHour" onChange={handleBandChange}/> <br/>
                <p>Would you tailor your playlist to client's request? </p> <br/>
                <label>Sure </label> 
                <input type="radio" name="canCustomizePlaylist" value="true" onChange={handleBandChange}/> 
                <label>I'd rather not </label> 
                <input type="radio" name="canCustomizePlaylist" value="false" onChange={handleBandChange}/> <br/>
                <label>If yes, how many days would you need to rehearse a new song? </label> <br/>
                <input type="number" name="minNoticePeriod" onChange={handleBandChange}></input><br/>

                <button type="submit">Publish</button>
            </form>
            <button onClick={showAddBand}>Cancel</button>
            
        </div>
    )
}

export default AddBand;
