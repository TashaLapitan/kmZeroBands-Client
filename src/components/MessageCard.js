import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import bandService from './../lib/bands-service';

class MessageCard extends Component {

    state = {
        band: {
            title: "",
            endpoint: ""
        },
        gigTitle: "",
        isRead: undefined,
        comment: ""
    }

    setComponentState = () => {
        bandService.getBandByID(this.props.message.bandID)
            .then(response => {
                this.setState({band: response.data, 
                                gigTitle: this.props.message.gigTitle, 
                                isRead: this.props.message.isRead,
                                comment: this.props.message.comment})
            })
    }

    componentDidMount () {
        this.setComponentState();
    }

    render() {
        if (this.state.band.title !== "" && this.state.gigTitle !== "" && this.state.band.endpoint !== "") {
            return (
                <div>
                    <p>{this.state.band.title} showed interest in {this.state.gigTitle}:</p>
                    <p>{this.state.comment}</p>
                    <Link to={this.state.band.endpoint} target="_blank"><button className="yes-btn">Contact them!</button></Link>
                </div>
            )
        } else {
            return <div></div>
        }
        
    }
}

export default  MessageCard;