import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withAuth } from './../context/auth-context';

import gigService from './../lib/gig-service';
import bandService from './../lib/bands-service';

import PostNewGig from './../components/PostNewGig';
import GigCard from './../components/GigCard';
import BandCard from './../components/BandCard';
import BandSearch from './../components/BandSearch';

class Home extends Component {

  state = {
    showAddGig: false,
    gigsArr: [],
    bandCities: [],
    bandGenres: [],                      
    bandSearch: {
      city: "",
      genre: "",                      
      title: ""
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
        if (allBands.length <= 5) {
          this.setState({bandsToDisplay: allBands, allBands, searchBandRes: allBands})
        } else {
          const fiveRandomBands = allBands.split(0,5);
          console.log(fiveRandomBands)
          this.setState({bandsToDisplay: fiveRandomBands, allBands, searchBandRes: allBands})
          }
        }
      )}

  filterBand = (name, str) => {
    let newArr = [];
    if (name === "city" || name === "title") {
      let newArr = this.state.searchBandRes.filter(bandObj => bandObj[name].toLowerCase().includes(str.toLowerCase()));
      this.setState({searchBandRes: newArr})
    } else {
      newArr = this.state.searchBandRes.filter(bandObj => (
        bandObj.genres[0].toLowerCase().includes(str.toLowerCase()) 
        || bandObj.genres[1].toLowerCase().includes(str.toLowerCase())
        || bandObj.genres[2].toLowerCase().includes(str.toLowerCase()))
      )
      this.setState({searchBandRes: newArr})
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({bandSearch: {...this.state.bandSearch, [name]: value}, showSearchResults: true});
     if (this.state.bandSearch === {city: "", genre: "", title: ""}) {
      this.setState({searchBandRes: this.state.allBands})
    } else {
      this.filterBand(name, this.state.bandSearch[name]);
    }
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

          {this.props.isLoggedIn && this.state.showAddGig
            ? <PostNewGig toggleAddGig={this.toggleAddGig} getGigs={this.getGigs}/>
            : this.props.isLoggedIn && !this.state.showAddGig
              ? <div className="post-gig-form">
                  <h2>Publish your own gig and receive offers from your local musicians!</h2>
                  <button className="yes-btn" onClick={this.toggleAddGig}>Post a gig</button>
                </div>
              :  <div className="post-gig-form">
                    <h2>Publish your own gig and receive offers from your local musicians!</h2>
                    <Link to='/login'><button className="yes-btn">Post a gig</button></Link>
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