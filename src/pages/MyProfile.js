import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import axios from 'axios';
import userService from './../lib/user-service';
import bandService from './../lib/bands-service';

import ProfileInfo from './../components/ProfileInfo';
import EditProfile from './../components/EditProfile';
import UpdateBand from './../components/UpdateBand';
import BandInfo from './../components/BandInfo';

class MyProfile extends Component {

  state = {
    user: {
      username: "",
      image: "",
      phoneNumber: "",
      aboutBio: "",
      isBandPOC: false,
      band: {
        title: "",
        description: "",
        phoneNumber: "",
        contactInfo: "",
        city: "",
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
      gigHistory: []
    },
    editProfile: false,
    updateBand: false,
    editBand: false
  }

  toggleEditProfile = () => {
    this.setState({editProfile: !this.state.editProfile})
  }

  handleProfileFormSubmit = event => {
    event.preventDefault();
    const { username, image, phoneNumber, aboutBio } = this.state.user;
    userService.editUser(username, image, phoneNumber, aboutBio)
      .then(() => {
        this.toggleEditProfile();
      })    
  };

  handleBandFormSubmit = event => {
    event.preventDefault();
    const {title, description, image, city, phoneNumber, contactInfo, instagramUrl, youtubeUrl, genre1, genre2, genre3, pricePerHour, canCustomizePlaylist, minNoticePeriod} = this.state.user.band;

    if (this.state.user.isBandPOC) {
      const bandID = this.state.user.band._id;
      bandService.updateBandInfo(bandID, title, description, city, image, phoneNumber, contactInfo, instagramUrl, youtubeUrl, genre1, genre2, genre3, pricePerHour, canCustomizePlaylist, minNoticePeriod)
      .then(() => {
        this.updateBand();
        this.setComponentState();
      })
    } else {
      bandService.createBand(title, description, image, city, phoneNumber, contactInfo, instagramUrl, youtubeUrl, genre1, genre2, genre3, pricePerHour, canCustomizePlaylist, minNoticePeriod)
      .then(() => {
        this.updateBand();
        this.setComponentState();
      })
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ user: {...this.state.user,[name]: value} });
  };

  handleBandChange = event => {
    const { name, value } = event.target;
    this.setState({ user: {...this.state.user, band: {...this.state.user.band, [name]: value}}});
  };

  handleFileUpload = event => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("image", file);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/upload`, uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response is: ", response);
        this.setState({ user: {...this.state.user, image: response.data.secure_url }});
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleBandImgUpload = event => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("image", file);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/bands/upload`, uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response is: ", response);
        this.setState({ user: {...this.state.user, band: {...this.state.user.band, image: response.data.secure_url} }});
        // console.log('IMAGE IN STATE AFTER SET STATE BEFORE EDIT PROFILE: ', this.state.user.image)
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  }

  deleteProfile = () => {
    const id = this.props.user._id;
    userService.deleteUser(id);
  }

  updateBand = () => {
    this.setState({updateBand: !this.state.updateBand});
  }

  deleteBand = () => {
    const id = this.state.user.band._id;
    bandService.deleteBand(id)
     .then(() => {
       this.updateBand();
       this.setComponentState();
     })
  }

  setComponentState = () => {
    userService.getUser(this.props.user._id)
    .then((response) => {
      const {username, image, dateOfBirth, phoneNumber, aboutBio, isBandPOC, band, gigHistory} = response.data;
      if (!band) {
        this.setState({user: {...this.state.user, username, image, dateOfBirth, phoneNumber, aboutBio, isBandPOC, gigHistory}});
      } else {
        band.genre1 = band.genres[0];
        band.genre2 = band.genres[1];
        band.genre3 = band.genres[2];
        this.setState({user: {username, image, dateOfBirth, phoneNumber, aboutBio, isBandPOC, band, gigHistory}});
      }
    })
  }
   
  componentDidMount () {
    this.setComponentState();
  }
  
  render() {
    return (
      <div>
        <h1>{this.state.user && this.state.user.username}</h1>
        <main>
          <div>
              {this.state.user.image 
              ? <img src={this.state.user.image} width="100px" alt=""/>
              : <img src="/images/profile-image-placeholder.png" width="40px" alt=""/>}
          </div>
          <div>
              {!this.state.editProfile 
              ? <ProfileInfo user={this.state.user} toggleEditProfile={this.toggleEditProfile} setComponentState={this.setComponentState}/>
              : 
              <EditProfile user={this.state.user} handleProfileFormSubmit={this.handleProfileFormSubmit} handleChange={this.handleChange} handleFileUpload={this.handleFileUpload}/>
              }
          </div>
        </main>
        <section>
          <h2>My band</h2>
          <div>
          { this.state.user.isBandPOC 
          ? !this.state.updateBand
            ? <div>
              <BandInfo band={this.state.user.band}/>
              <button onClick={this.updateBand}>Edit band</button>
              </div>
            : <UpdateBand band={this.state.user.band} updateBand={this.updateBand} handleBandImgUpload={this.handleBandImgUpload} handleBandFormSubmit={this.handleBandFormSubmit} handleBandChange={this.handleBandChange} deleteBand={this.deleteBand} bandExists={this.state.user.isBandPOC}></UpdateBand> 
          : !this.state.updateBand
            ? <div>
                <p>You haven't published a band yet</p>
                <button className="yes-btn" onClick={this.updateBand}>Add a band</button>
              </div>
            : <UpdateBand band={this.state.user.band} updateBand={this.updateBand} handleBandImgUpload={this.handleBandImgUpload} handleBandFormSubmit={this.handleBandFormSubmit} handleBandChange={this.handleBandChange}></UpdateBand> 
          }        
          </div>
        </section>
        
        <aside>
          {/* <Link to={'/'} onClick={this.deleteProfile}>Delete Profile</Link> */}
        </aside>
      </div>
    );
  }
}


export default withAuth(MyProfile);
