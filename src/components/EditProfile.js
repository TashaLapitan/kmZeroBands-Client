import React from 'react';

function EditProfile (props) {

            const {handleChange, handleFileUpload, handleProfileFormSubmit} = props;
            const {username, dateOfBirth, phoneNumber, aboutBio} = props.user;

            return (
                <form onSubmit={(e) => handleProfileFormSubmit(e)}>
                    <h2>My Profile Info</h2>
                    <label>Profile image</label>
                        <input
                            type="file"
                            onChange={(e)=> handleFileUpload(e)}
                        ></input>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={(e) => handleChange(e)}/>
                    <label>Date of birth</label>
                    <input type="text" name="dateOfBirth" value={dateOfBirth} onChange={(e) => handleChange(e)}/>
                    <label>Phone number</label>
                    <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => handleChange(e)}/>
                    <label>About me</label>
                    <textarea rows="4" cols="50" name="aboutBio" value={aboutBio} placeholder="More info about you" onChange={(e) => handleChange(e)}/>
                    <input type="submit" value="Update Info"/>
                </form>
            )
    }

export default EditProfile;