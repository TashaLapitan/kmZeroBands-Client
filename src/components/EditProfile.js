import React, {Component} from 'react';

class EditProfile extends Component {


        render () {
            const {handleChange, handleFileUpload, handleProfileFormSubmit} = this.props;
            const {username, dateOfBirth, phoneNumber, aboutBio} = this.props.user;

            return (
                <form onSubmit={handleProfileFormSubmit}>
                    <h2>My Profile Info</h2>
                    <label>Profile image</label>
                        <input
                            // name="image"
                            type="file"
                            onChange={(e)=> handleFileUpload(e)}
                        ></input>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleChange}/>
                    <label>Date of birth</label>
                    <input type="text" name="dateOfBirth" value={dateOfBirth} onChange={handleChange}/>
                    <label>Phone number</label>
                    <input type="text" name="phoneNumber" value={phoneNumber} onChange={handleChange}/>
                    <label>About me</label>
                    <input type="texarea" rows="4" cols="50" name="aboutBio" value={aboutBio} placeholder="More info about you" onChange={handleChange}/>
                    <input type="submit" value="Update Info"/>
                </form>
            )
        }
    }

export default EditProfile;