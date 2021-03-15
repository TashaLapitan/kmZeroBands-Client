import React, { Component } from 'react';
import gigService from './../lib/gig-service';
import GigCard from './../components/GigCard';
import GigSearch from './../components/GigSearch';

class GigBoard extends Component {

    state = {
        gigsArr: [],
        gigCities: [],
        query: ""
    }

    handleSearchSubmit = (event) => {
        event.preventDefault();
        gigService.searchGigs(this.state.query)
            .then(response => {
                this.setState({gigsArr: response.data})
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({query: value})
    }

    showAllGigs = () => {
        gigService.getAllGigs()
            .then((response) => {
                const allGigs = response.data;
                let gigCities = [];
                allGigs.forEach(gig => {
                    if (!gigCities.includes(gig.city))
                    gigCities.push(gig.city)
                })
                this.setState({gigsArr: allGigs, gigCities})
            })
    }

    clearSearch = () => {
        this.showAllGigs();
        this.setState({query: ""})
    }

    componentDidMount () {
        this.showAllGigs()
    }

    render() {

        return (
            <div>
                <h1>Gig Board</h1>
                <h3>Select your city to check out current pending gigs</h3>
                <GigSearch handleSearchSubmit={this.handleSearchSubmit} 
                    handleChange={this.handleChange} 
                    gigCities={this.state.gigCities} 
                    query={this.state.query}
                    clearSearch={this.clearSearch}/>
                <section className="gig-section">
                    {this.state.gigsArr.map(gig => {
                        const today = new Date(Date.now());
                        const gigDate = new Date(gig.date);
                        if (gigDate >= today) {
                            return <GigCard className={"sticky-note"} key={gig._id} gig={gig}/>
                        } 
                    })}

                </section>
            </div>
        )
    }
}

export default GigBoard;
