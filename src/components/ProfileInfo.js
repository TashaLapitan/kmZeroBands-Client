import React, { Component } from 'react'
import GigCard from './../components/GigCard';
import gigService from './../lib/gig-service';

class ProfileInfo extends Component {


    handleDelete = (event, id) => {
        event.preventDefault();
        gigService.deleteGig(id)
            .then(() => {
                this.props.setComponentState();
            })
    }

    render() {

        return (
            <section>
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
                            <td>Username</td>
                            <td>{this.props.user.username}</td>
                        </tr>
                        <tr>
                            <td>Phone number</td>
                            <td>{this.props.user.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>About me</td>
                            <td>{this.props.user.aboutBio}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={this.props.toggleEditProfile}>Edit Profile</button>
                <div>
                    <h2>My pending gigs: </h2>
                    {this.props.user.gigHistory
                    ? this.props.user.gigHistory.map(gig => {
                        const today = new Date(Date.now());
                        const gigDate = new Date(gig.date);
                        if (gigDate >= today) {
                            return  <div  key={gig._id}>
                                        <GigCard gig={gig} handleDelete={this.handleDelete} user={this.props.user}/>
                                    </div>
                            
                            
                        }})
                    : <p>You haven't posted any gigs yet</p>}
                </div>
            </section>
        )
    }
}


export default ProfileInfo;