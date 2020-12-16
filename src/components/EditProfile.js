import React from 'react';

function EditProfile (props) {

            const {handleChange, handleFileUpload, handleProfileFormSubmit} = props;
            const {username, phoneNumber, aboutBio} = props.user;

            return (
                <form onSubmit={(e) => handleProfileFormSubmit(e)}>
                    <h2>My Profile Info</h2>
                    <label>Profile image</label> <br/>
                        <input
                            type="file"
                            onChange={(e)=> handleFileUpload(e)}
                        ></input> <br/>
                    <label>Username</label> <br/>
                    <input type="text" name="username" value={username} onChange={(e) => handleChange(e)}/> <br/>
                    <label>Phone number</label> <br/>
                    <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => handleChange(e)}/> <br/>
                    <label>About me</label> <br/>
                    <textarea rows="4" cols="50" name="aboutBio" value={aboutBio} placeholder="More info about you" onChange={(e) => handleChange(e)}/> <br/>
                    <input className="yes-btn" type="submit" value="Update Info"/>
                    <button className="no-btn" onClick={(e) => props.deleteProfile(e)}>Delete Profile</button>
                </form>
            )
    }

export default EditProfile;