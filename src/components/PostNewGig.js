import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import gigService from '../lib/gig-service';

class PostNewGig extends Component {

    state = {
        title: "",
        description: "",
        date: undefined,
        city: "",
        genre: "",
        durationHours: undefined,
        pricePerHour: undefined
    }

    handleInput = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleGigSubmit = event => {
        event.preventDefault();
        const {title, description, date, city, genre, durationHours, pricePerHour} = this.state; 
        const newDate = new Date(date);
        gigService.createGig(title, description, newDate, city, genre, durationHours, pricePerHour)
            .then(() => {
                this.props.toggleAddGig();
                this.props.getGigs();
            })
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleGigSubmit(e)} className="add-form">
                <h2>Tell us more about your gig</h2>
                <label>Title: </label> <br/>
                <input type="text" name="title" value={this.state.value} placeholder="Ex.: Beach party" onChange={(e) => this.handleInput(e)}/> <br/>
                <label>City: </label> <br/>
                <input type="text" name="city" value={this.state.city} onChange={(e) => this.handleInput(e)}/> <br/>
                <label>When are you planning this gig: </label> <br/>
                <input type="date" name="date" value={this.state.date} onChange={(e) => this.handleInput(e)}/> <br/>
                <label>Description: </label> <br/>
                <textarea rows="4" cols="50" name="description" 
                    value={this.state.description}
                    placeholder="Ex.: Looking for a guitar player to join us at the beach"
                    onChange={(e) => this.handleInput(e)}>
                </textarea> <br/>
                <label>Which music genre best describes your gig? </label> <br/>
                <input type="text" name="genre" value={this.state.genre} onChange={(e) => this.handleInput(e)}/> <br/>
                <label>How long will your gig last?</label> <br/>
                <input type="number" min="0" name="durationHours" value={this.state.durationHours} onChange={(e) => this.handleInput(e)}/><span> hours</span> <br/>
                <label>How much do you offer?</label> <br/>
                <input type="number" min="0" name="pricePerHour" value={this.state.pricePerHour} onChange={(e) => this.handleInput(e)}/><span> € per hour</span> <br/>
                <button className="yes-btn" type="submit">Post my gig!</button>
                <button className="no-btn" onClick={this.props.toggleAddGig}>Discard</button>
            </form>
        )
    }
}

export default PostNewGig;