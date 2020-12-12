import React from "react";

function ProfileInfo (props) {

        return (
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
        )
}

export default ProfileInfo;