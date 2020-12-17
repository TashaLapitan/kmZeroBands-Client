import React, { Component } from 'react'
import GigCard from './../components/GigCard';
import MessageCard from './../components/MessageCard';
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

        const myGigs = this.props.user.gigHistory;

        let allMessages = [];
        myGigs.forEach(gig => {
            if (gig.bandResponses.length !== 0){
            gig.bandResponses.forEach(message => {
                allMessages.push(message)
            })
        }}) 

        return (
            <section>
                <h2>My Profile Info</h2>
                <table>
                    <thead>
                        <tr>
                            <th>
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
                <button className="no-btn" style={{marginTop: "30px"}} onClick={this.props.toggleEditProfile}>Edit Profile</button>
                <aside>
                    <h2>My notifications: </h2>
                    {allMessages.length > 0
                    ? <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", width: "345px"}}>
                        {allMessages.map(message => {
                            return <MessageCard key={message._id} message={message}/>
                        })}
                    </div>
                    : <p>You haven't received any resposes yet</p>}
                </aside>
                <h2>My pending gigs: </h2>
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", width: "345px"}}>
                    {myGigs
                    ? myGigs.map(gig => {
                        const today = new Date(Date.now());
                        const gigDate = new Date(gig.date);
                        if (gigDate >= today) {
                            return  <div  key={gig._id}>
                                        <GigCard className={"gig-plain-card"} gig={gig} 
                                        handleDelete={this.handleDelete} 
                                        user={this.props.user}/>
                                    </div>
                        }})
                    : <p>You haven't posted any gigs yet</p>}
                </div>
                
            </section>
        )
    }
}

    

export default ProfileInfo;