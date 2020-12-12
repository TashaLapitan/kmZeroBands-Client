import React from "react";

function ProfileInfo (props) {

        const gigArr = props.user.gigHistory;

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
                            <td>{props.user.username}</td>
                        </tr>
                        <tr>
                            <td>Date of birth</td>
                            <td>{props.user.dateOfBirth}</td>
                        </tr>
                        <tr>
                            <td>Phone number</td>
                            <td>{props.user.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>About me</td>
                            <td>{props.user.aboutBio}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h2>My pending gigs: </h2>
                    {gigArr
                    ? gigArr.map(gig => {
                        if (gig.isPending) {
                            return (
                            <div key={gig._id}>
                                <h5>{gig.title}</h5>
                                <p>{gig.description}</p>
                                <p>{gig.pricePerHour} eur</p>
                                <p>{gig.durationHours}</p>
                            </div>
                        )
                        }
                    })
                    : <p>You haven't posted any gigs yet</p>}
                </div>
            </section>
            
        )
}

export default ProfileInfo;