import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import { Link } from "react-router-dom";
import axios from 'axios';
import userService from './../lib/user-service';
import bandService from './../lib/bands-service';

import ProfileInfo from './../components/ProfileInfo';
import EditProfile from './../components/EditProfile';
import AddBand from './../components/AddBand';

class MyProfile extends Component {

  state = {
    user: {
      username: "",
      image: "",
      dateOfBirth: "",
      phoneNumber: "",
      aboutBio: "",
      isBandPOC: undefined
    },
    band: {
      title: "",
      description: "",
      phoneNumber: "",
      contactInfo: "",
      genre1: "",
      genre2: "",
      genre3: "",
      genres: [],
      image: "",
      instagramUrl: "",
      youtubeUrl: "",
      pricePerHour: undefined,
      canCustomizePlaylist: undefined,
      minNoticePeriod: undefined,
      pocID: undefined
    },
    editProfile: false,
    showAddBand: false
  }

  toggleEditProfile = () => {
    this.setState({editProfile: !this.state.editProfile})
  }

  handleProfileFormSubmit = event => {
    event.preventDefault();
    const { username, image, dateOfBirth, phoneNumber, aboutBio } = this.state.user;
    userService.editUser(username, image, dateOfBirth, phoneNumber, aboutBio)
      .then(() => {
        this.toggleEditProfile();
      })    
  };

  handleBandFormSubmit = event => {
    event.preventDefault();
    console.log('STATE AFTER SUBMITTING THE BAND FORM ', this.state)
    const {title, description, phoneNumber, contactInfo, instagramUrl, youtubeUrl, genre1, genre2, genre3, pricePerHour, canCustomizePlaylist, minNoticePeriod} = this.state.band;
    bandService.createBand(title, description, phoneNumber, contactInfo, instagramUrl, youtubeUrl, genre1, genre2, genre3, pricePerHour, canCustomizePlaylist, minNoticePeriod)
    //THEN WHAT TASHA
    //returns promise
      .then((createdBand) => {
        this.setState({band: createdBand})
        this.showAddBand();
      })
    }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ user: {...this.state.user,[name]: value} });
  };

  handleBandChange = event => {
    const { name, value } = event.target;
    this.setState({ band: {...this.state.band, [name]: value}});
    // console.log('band change: ', this.state.band.title, this.state.band.description, this.state.band.phoneNumber)
  };

  handleFileUpload = event => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("image", file);
    axios
      .post('http://localhost:5000/api/user/upload', uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response is: ", response);
        this.setState({ user: {...this.state.user, image: response.data.secure_url }});
        // console.log('IMAGE IN STATE AFTER SET STATE BEFORE EDIT PROFILE: ', this.state.user.image)
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  deleteProfile = () => {
    const id = this.props.user._id;
    userService.deleteUser(id);
  }

  showAddBand = () => {
    this.setState({showAddBand: !this.state.showAddBand});
  }

  setUserState = () => {
    userService.getUser(this.props.user._id)
    .then((response) => {
      const {username, image, dateOfBirth, phoneNumber, aboutBio} = response.data
      this.setState({user: {username, image, dateOfBirth, phoneNumber, aboutBio}})
    })
  }

  componentDidMount () {
    this.setUserState();
  }
  
  render() {
    return (
      <div>
        <h1>{this.state.user && this.state.user.username}</h1>
        <main>
          <div>
              {this.state.user.image 
              ? <img src={this.state.user.image} alt=""/>
              : <img src="/images/profile-image-placeholder.png" alt=""/>}
          </div>
          <div>
              {!this.state.editProfile 
              ? <div>
                  <ProfileInfo user={this.state.user}/>
                <button onClick={this.toggleEditProfile}>Edit Profile</button>
              </div>
              : 
              <EditProfile user={this.state.user} handleProfileFormSubmit={this.handleProfileFormSubmit} handleChange={this.handleChange} handleFileUpload={this.handleFileUpload}/>
              }
          </div>
        </main>
        <section>
          <h2>My band</h2>
          {this.state.user.isBandPOC
          ? <div>BAND DETAILS</div>
          : <div>
              <p>You haven't published a band yet</p>
              {this.state.showAddBand 
              ? <AddBand user={this.state.user} showAddBand={this.showAddBand} handleBandFormSubmit={this.handleBandFormSubmit} handleBandChange={this.handleBandChange}></AddBand> 
              : <button onClick={this.showAddBand}>Add a band</button>}
            </div>}
        </section>
        
        <aside>
          <Link to={'/'} onClick={this.deleteProfile}>Delete Profile</Link>
        </aside>
      </div>
    );
  }
}


export default withAuth(MyProfile);
