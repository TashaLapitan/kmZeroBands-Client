import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import userService from './../lib/user-service';

class MyProfile extends Component {

  state = {
    username: "",
    image: "",
    dateOfBirth: "",
    phoneNumber: [],
    aboutBio: "",
    editProfile: false
  }

  toggleEdit = () => {
    this.setState({editProfile: !this.state.editProfile})
  }

  handleFormSubmit = event => {
    const id = this.props.user._id;
    event.preventDefault();
    const { username, image, dateOfBirth, phoneNumber, aboutBio } = this.state;
    userService.editUser(id, username, image, dateOfBirth, phoneNumber, aboutBio);
    this.toggleEdit();
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

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
                  <table>
                  <thead>
                    <tr>
                      <th>
                        <h2>My Profile Info</h2>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Username
                      </td>
                      <td>
                        {this.state.username}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Date of birth
                      </td>
                      <td>
                        {this.state.dateOfBirth}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Phone number
                      </td>
                      <td>
                        {this.state.phoneNumber}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        About me
                      </td>
                      <td>
                        {this.state.aboutBio}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button onClick={this.toggleEdit}>Edit Profile</button>
              </div>
              : 
                <form onSubmit={this.handleFormSubmit}>
                  <h2>My Profile Info</h2>
                  <label>Username</label>
                  <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                  <label>Date of birth</label>
                  <input type="text" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange}/>
                  <label>Phone number</label>
                  <input type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange}/>
                  <label>About me</label>
                  <input type="texarea" rows="4" cols="50" name="aboutBio" value={this.state.aboutBio} placeholder="More info about you" onChange={this.handleChange}/>
                  <input type="submit" value="Update Info"/>
                  </form>
              }
          </div>
        </main>
        <section>
          <h2>My bands</h2>
          {this.props.user.isBandPOC
          ? <div>Band profile card with link to band page</div>
          : <div>
              <p>You haven't published a band yet</p>
              {/* will be link */}
              <button>Add a band</button>
            </div>}
        </section>
        

      </div>
    );
  }
}


export default withAuth(MyProfile);
