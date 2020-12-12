import React, { Component } from 'react'
import gigService from '../lib/gig-service';

class PostNewGig extends Component {

    state = {
        title: "",
        description: "",
        date: undefined,
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
        const {title, description, date, genre, durationHours, pricePerHour} = this.state;
        gigService.createGig(title, description, date, genre, durationHours, pricePerHour)
            .then(() => {
                this.props.toggleAddGig();
            })
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleGigSubmit(e)}>
                <h2>Tell us more about your gig</h2>
                <label>Title: </label> <br/>
                <input type="text" name="title" value={this.state.value} placeholder="Ex.: A romantic gesture" onChange={(e) => this.handleInput(e)}/> <br/>
                <label>Description: </label> <br/>
                <textarea rows="4" cols="50" name="description" 
                    value={this.state.description}
                    placeholder="Ex.: Looking for a decent sax player to play a cheesy song under my gf's window"
                    onChange={(e) => this.handleInput(e)}>
                </textarea> <br/>
                <label>Which music genre best describes your gig? </label> <br/>
                <input type="text" name="genre" value={this.state.genre} onChange={(e) => this.handleInput(e)}/> <br/>
                <label>When are you planning this gig: </label> <br/>
                <input type="date" name="date" value={this.state.date} onChange={(e) => this.handleInput(e)}/> <br/>
                <label>How long will your gig last? Give a number in hours</label> <br/>
                <input type="number" min="0" name="durationHours" value={this.state.durationHours} onChange={(e) => this.handleInput(e)}/><span> hours</span> <br/>
                <label>How much do you offer?</label> <br/>
                <input type="number" min="0" name="pricePerHour" value={this.state.pricePerHour} onChange={(e) => this.handleInput(e)}/><span> € per hour</span> <br/>
                <button type="submit">Post my gig!</button>
            </form>
        )
    }
}

export default PostNewGig;