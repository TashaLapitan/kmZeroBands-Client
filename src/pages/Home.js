import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withAuth } from './../context/auth-context';

import gigService from './../lib/gig-service';
import bandService from './../lib/bands-service';

import PostNewGig from './../components/PostNewGig';
import GigCard from './../components/GigCard';
import BandCard from '../components/BandCard';
import BandSearch from './../components/BandSearch';


class Home extends Component {

  state = {
    showAddGig: false,
    gigsArr: [],
    bandCities: [],
    bandGenres: [],                      
    bandSearch: {
      city: "",
      genre: ""
    },
    bandsToDisplay: [],
    allBands: [],
    searchBandRes: [],
    showSearchResults: false
  }

  toggleAddGig = () => {
    this.setState({showAddGig: !this.state.showAddGig});
  }

  getGigs = () => {
    gigService.getAllGigs()
      .then((response) => {
        const allGigs = response.data;
        const dateToday = new Date(Date.now());
        let pendingGigs = [];
        allGigs.forEach((gig) => {
          const gigDate = new Date(gig.date)
          if (gigDate >= dateToday) 
          {pendingGigs.push(gig)}});
        const fiveGigs = pendingGigs.slice(0,5)
        
        this.setState({gigsArr: fiveGigs})
      })
  }

  getBandOptions = () => {
    bandService.getAllBands()
      .then((response) => {
        const bandsArr = response.data;
        let citiesArr = [];
        let genreArr = [];
        bandsArr.forEach(band => {
          if (!citiesArr.includes(band.city)) {
            citiesArr.push(band.city);
          }
          band.genres.forEach(genre => {
            if (genre && !genreArr.includes(genre)) {
              genreArr.push(genre);
            }
          })
        })
        this.setState({bandCities: citiesArr, bandGenres: genreArr})
      })
  }

  getAllBands = () => {
    bandService.getAllBands()
      .then(response => {
        let allBands = response.data;
        this.setState({bandsToDisplay: allBands, allBands, searchBandRes: allBands})
        }
      )}

  filterByGenre = (genre, arr) => {
    genre = genre.toLowerCase();
    let results = [];
    arr.forEach(bandObj => {
      if (bandObj.genres[0].toLowerCase().includes(genre) 
      || bandObj.genres[1].toLowerCase().includes(genre)
      || bandObj.genres[2].toLowerCase().includes(genre)) {
        results.push(bandObj)
      }
    })
    return results;
  }

  filterByCity = (city) => {
    city = city.toLowerCase();
    let results = [];
    this.state.allBands.forEach(bandObj => {
      if (bandObj.city.toLowerCase().includes(city)) {
        results.push(bandObj)
      }
    })
    return results;
  }

  filterByCityAndGenre = (city, genre) => {
    let results = this.filterByCity(city);
    return this.filterByGenre(genre, results)
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({bandSearch: {...this.state.bandSearch, [name]: value}, showSearchResults: true});
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    if (this.state.bandSearch === {city: "", genre: ""}) {
      this.setState({searchBandRes: this.state.allBands})
    } else if (this.state.bandSearch.city === "") {
      this.setState({searchBandRes: this.filterByGenre(this.state.bandSearch.genre, this.state.allBands)})
    } else if (this.state.bandSearch.genre === "") {
      this.setState({searchBandRes: this.filterByCity(this.state.bandSearch.city)})
    } else {
      this.setState({searchBandRes: this.filterByCityAndGenre(this.state.bandSearch.city, this.state.bandSearch.genre)})
    }
  }

  clearSearch = () => {
    this.setState({bandSearch: {
      city: "",
      genre: ""
    }})
  }

  componentDidMount () {
    this.getGigs();
    this.getBandOptions();
    this.getAllBands();
  }

  render() {
    return (
      <> 
         <main>
           <section>
              <BandSearch handleChange={this.handleChange}
                  handleSearchSubmit={this.handleSearchSubmit}
                  clearSearch={this.clearSearch}
                  bandSearch={this.state.bandSearch}
                  bandCities={this.state.bandCities}
                  bandGenres={this.state.bandGenres}
              />
            {this.state.showSearchResults 
            ? <div>
                {this.state.searchBandRes.length === 0 
                ? <div><h3>Sorry, no results. But why don't you... </h3></div>            
                : <div className="search-results">
                    {this.state.searchBandRes.map((bandObj) => {
                      return <BandCard key={bandObj._id} band={bandObj}/>
                    })}
                  </div>}
              </div>
            : <div className="search-results">
                {this.state.bandsToDisplay.map((bandObj) => {
                  return <BandCard key={bandObj._id} band={bandObj}/>
                })}
              </div>}
            
           </section>

          {this.state.showAddGig
            ? <PostNewGig toggleAddGig={this.toggleAddGig} getGigs={this.getGigs}/>
            : <div className="post-gig-form">
                <h2>Publish your own gig and receive offers from your local musicians!</h2>
                <button className="yes-btn" onClick={this.toggleAddGig}>Post a gig</button>
              </div>}
              
         </main>
         <section className="gig-section">
           {this.state.gigsArr.map((gig) => {
              return <GigCard className={"sticky-note"} key={gig._id} gig={gig} user={this.props.user}/>
             })}
         </section>
       </>
    )
  }
}

export default withAuth(Home);