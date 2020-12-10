import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import { Link } from "react-router-dom";
import userService from './../lib/user-service';
import ProfileInfo from './../components/ProfileInfo';
import EditProfile from './../components/EditProfile';

class MyProfile extends Component {

  state = {
    username: "",
    image: "",
    dateOfBirth: "",
    phoneNumber: [],
    aboutBio: "",
    editProfile: false
  }

  toggleEditProfile = () => {
    this.setState({editProfile: !this.state.editProfile})
  }

  handleProfileFormSubmit = event => {
    const id = this.props.user._id;
    event.preventDefault();
    const { username, image, dateOfBirth, phoneNumber, aboutBio } = this.state;
    userService.editUser(id, username, image, dateOfBirth, phoneNumber, aboutBio);
    this.toggleEditProfile();
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  deleteProfile = () => {
    const id = this.props.user._id;
    userService.deleteUser(id);
  }

  componentDidMount () {
    const {username, image, dateOfBirth, phoneNumber, aboutBio} = this.props.user;
    this.setState({username, image, dateOfBirth, phoneNumber, aboutBio});
  }
  
  render() {
    return (
      <div>
        <h1>{this.props.user && this.props.user.username}</h1>
        <main>
          <div>
              {this.props.user.image 
              ? <img src={this.props.user.image} alt=""/>
              : <img src="/images/profile-image-placeholder.png" alt=""/>}
          </div>
          <div>
              {!this.state.editProfile 
              ? <div>
                  <ProfileInfo user={this.state}/>
                <button onClick={this.toggleEditProfile}>Edit Profile</button>
              </div>
              : 
              <EditProfile user={this.state} handleProfileFormSubmit={this.handleProfileFormSubmit} handleChange={this.handleChange}/>
              }
          </div>
        </main>
        <section>
          <h2>My bands</h2>
          {this.props.user.isBandPOC
          ? <div>Band component with option to edit on the same page </div>
          : <div>
              <p>You haven't published a band yet</p>
              {/* will be link */}
              <button>Add a band</button>
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
