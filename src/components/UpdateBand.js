import React from 'react';

function UpdateBand (props) {
    const {bandExists, handleBandChange, handleBandFormSubmit, updateBand, deleteBand, handleBandImgUpload} = props;
    const {title, image, city, description, phoneNumber, contactInfo, instagramUrl, youtubeUrl, genre1, genre2, genre3, pricePerHour, canCustomizePlaylist, minNoticePeriod} = props.band;
    
    return (
        <div>
            <img src={image} alt=""/>
            <form onSubmit={(e) => handleBandFormSubmit(e)}>
                <label>Band Photo: </label>
                <input type="file" onChange={(e)=> handleBandImgUpload(e)}></input> <br/>
                <label>Title: </label> <br/>
                <input type="text" name="title" value={title} onChange={handleBandChange}/> <br/>
                <label>City: </label> <br/>
                <input type="text" name="city" value={city} onChange={handleBandChange}/> <br/>
                <label>Description: </label> <br/>
                <textarea rows="4" cols="50" name="description" value={description} onChange={handleBandChange}></textarea> <br/>
                <label>Phone Number: </label> <br/>
                <input type="text" name="phoneNumber" value={phoneNumber} onChange={handleBandChange}/> <br/>
                <label>Contact Info: </label> <br/>
                <textarea rows="4" cols="50" name="contactInfo" value={contactInfo} onChange={handleBandChange}></textarea> <br/>
                <label>Which genres do you play? </label> <br/>
                <input type="text" name="genre1" value={genre1} onChange={handleBandChange}/> <br/>
                <input type="text" name="genre2" value={genre2} onChange={handleBandChange}/> <br/>
                <input type="text" name="genre3" value={genre3} onChange={handleBandChange}/> <br/>
                <label>Link to Instagram: </label> <br/>
                <input type="text" name="instagramUrl" value={instagramUrl} onChange={handleBandChange}/> <br/>
                <label>Link to YouTube: </label> <br/>
                <input type="text" name="youtubeUrl" value={youtubeUrl} onChange={handleBandChange}/> <br/>
                <label>How much do you charge hourly? </label> <br/>
                <input type="number" name="pricePerHour" value={pricePerHour} onChange={handleBandChange}/> <br/>
                <p>Would you tailor your playlist to client's request? </p> <br/>
                <label>Sure </label> 
                {canCustomizePlaylist 
                ? <input type="radio" name="canCustomizePlaylist" value="true" checked="checked" onChange={handleBandChange}/>
                : <input type="radio" name="canCustomizePlaylist" value="true" onChange={handleBandChange}/>
                }
                <label>I'd rather not </label> 
                {canCustomizePlaylist 
                ? <input type="radio" name="canCustomizePlaylist" value="false" onChange={handleBandChange}/>
                : <input type="radio" name="canCustomizePlaylist" value="false" checked="checked" onChange={handleBandChange}/>
                }
                <br/>
                <label>If yes, how many days would you need to rehearse a new song? </label> <br/>
                <input type="number" name="minNoticePeriod" value={minNoticePeriod} onChange={handleBandChange}></input><br/>

                <button className="yes-btn" type="submit">Publish</button>
            </form>
            <button onClick={updateBand}>Cancel</button>
            {bandExists 
            ? <button onClick={deleteBand}>Delete Band</button>
            : null
            }
        </div>
    )
}

export default UpdateBand;
