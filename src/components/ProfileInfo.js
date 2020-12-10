import React, { Component } from "react";

class ProfileInfo extends Component {


    render () {
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
                    <td>{this.props.user.username}</td>
                </tr>
                <tr>
                    <td>Date of birth</td>
                    <td>{this.props.user.dateOfBirth}</td>
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
        )}
}

export default ProfileInfo;