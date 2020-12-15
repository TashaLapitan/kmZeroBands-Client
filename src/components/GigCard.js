import React, { Component } from 'react';
import { withAuth } from './../context/auth-context';
import gigService from './../lib/gig-service';
import userService from './../lib/user-service';

class GigCard extends Component {

    state = { 
        gig: {
            title: "",
            description: "",
            city: "",
            date: undefined,
            genre: "",
            durationHours: undefined,
            pricePerHour: undefined
        },
        gigAuthor: {
            username: "",
            phoneNumber: ""
        },
        canEditGig: false,
        canRespond: false,
        comment: ""
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({gig: {...this.state.gig, [name]: value}})
    }

    handleMessageInput = (event) => {
        const input = event.target.value;
        this.setState({comment: input})
    }

    getGigAuthor = () => {
        userService.getUser(this.props.gig.clientID)
            .then((response) => {
                this.setState({gigAuthor: response.data})
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {title, description, city, date, genre, durationHours, pricePerHour} = this.state.gig;
        const {_id} = this.state.gig
        gigService.updateGig(_id, title, description, city, date, genre, durationHours, pricePerHour)
            .then((response) => {
                this.setState({gig: response.data, canEditGig: false})
            })
        
    }

    handleGigResponse = (event) => {
        event.preventDefault();
        const message = this.state.comment;

        gigService.addGigResponse(this.state.gig._id, this.props.user.band, message)
            .then(() => 
                this.toggleRespond()
            )
    }

    toggleEditGig = () => {
        this.setState({canEditGig: !this.state.canEditGig})
    }

    toggleRespond = () => {
        this.setState({canRespond: !this.state.canRespond})
    }

    componentDidMount () {
        this.setState({gig: this.props.gig});
        this.getGigAuthor();
    }    

    render() {

        function formatDate (dateObj) {
            const dateOfGig = new Date(dateObj);
            let dateToShow = dateOfGig.toString().slice(4,15);
            dateToShow = dateToShow.slice(4,7) + dateToShow.slice(0,4) + dateToShow.slice(7);
            return dateToShow;
        }

        function numeralizeMonth (month) {
            let num = '';
            switch(month){
            case 'Jan':
                num = "01";
                break;
            case 'Feb':
                num = "02";
                break;
            case 'Mar':
                num = "03";
                break;
            case 'Apr':
                num = "04";
                break;
            case 'May':
                num = "05";
                break;
            case 'Jun':
                num = "06";
                break;
            case 'Jul':
                num = "07";
                break;
            case 'Aug':
                num = "08";
                break;
            case 'Sep':
                num = "09";
                break;
            case 'Oct':
                num = "10";
                break;
            case 'Nov':
                num = "11";
                break;
            case 'Dec':
                num = "12";
                break;
            }
            return num;
        }

        function displayDateInput (dateObj) {
            const dateVar = new Date(dateObj);
            let dateToShow = dateVar.toString().slice(4,15)
            dateToShow = dateToShow.slice(7) + '-' + numeralizeMonth(dateToShow.slice(0,3)) + '-' + dateToShow.slice(4,6)
            return dateToShow;
        }
        
        const {title, city, date, durationHours, pricePerHour, genre, description, _id} = this.state.gig;
        const {username, phoneNumber} = this.state.gigAuthor;

        return (
            <section>
                {!this.state.canEditGig
                ?   <div>
                        <h2>{title}</h2>
                        <ul>
                            <li>{city}</li>
                            <li>{formatDate(date)}</li>
                            <li>{durationHours} hours</li>
                            <li>{pricePerHour}€ per hour</li>
                            <li>{genre}</li>
                        </ul>
                        <p>{description}</p>
                        <p>Posted by: {username}</p>
                        <p>Contact: {phoneNumber}</p>

                        {this.props.user && this.props.user.isBandPOC === true && this.props.user._id !== this.state.gigAuthor._id
                        ? <div>
                            {this.state.canRespond
                                ? <form onSubmit={(e) => {this.handleGigResponse(e)}}>
                                    <label>Your message: </label> 
                                    <input type="text" name="comment" value={this.state.comment} onChange={(e) => {this.handleMessageInput(e)}}></input>
                                    <button>Send</button>
                                    <button onClick={this.toggleRespond}>Discard</button>
                                </form>
                                : <button onClick={this.toggleRespond}>I can do it!</button>}
                        </div> 
                        : null}

                        



                        { this.props.user && this.props.user._id === this.state.gigAuthor._id
                        ?   <button onClick={this.toggleEditGig}>Edit</button>
                        : null}
                    </div>
                : <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label>Title:</label>
                    <input type="text" name="title" value={title} onChange={e => this.handleChange(e)}></input>
                    <label>Description:</label>
                    <input type="text" name="description" value={description} onChange={e => this.handleChange(e)}></input>
                    <label>City:</label>
                    <input type="text" name="city" value={city} onChange={e => this.handleChange(e)}></input>
                    <label>Date</label>
                    <input type="date" name="date" value={displayDateInput(date)} onChange={e => this.handleChange(e)}></input>
                    <label>Genre:</label>
                    <input type="text" name="genre" value={genre} onChange={e => this.handleChange(e)}></input>
                    <label>Duration:</label>
                    <input type="number" name="durationHours" value={durationHours} onChange={e => this.handleChange(e)}></input><span> hours</span>
                    <label>Reward per hour:</label>
                    <input type="number" name="pricePerHour" value={pricePerHour} onChange={e => this.handleChange(e)}></input>€/hr

                    <button type="submit">Save</button>
                    <button onClick={this.toggleEditGig}>Cancel</button>
                </form>
                <button onClick={(e)=> this.props.handleDelete(e, _id)}>Delete</button>
            </div>}
            </section>
        )
    }
}

export default withAuth(GigCard);
