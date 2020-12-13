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
    bandGenres: [],                      //for datalist
    bandSearch: {
      city: "",
      genre: "",                      //from search onChange
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
        this.setState({gigsArr: response.data})
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
        if (allBands.length <= 10) {
          this.setState({bandsToDisplay: allBands, allBands, searchBandRes: allBands})
        } else {
          let tenRandBands = [];
          for (let i=0; i<10; i++) {
            const index = Math.floor(Math.random() * allBands.length);
            tenRandBands.push(allBands[index])
          }
          this.setState({bandsToDisplay: tenRandBands, allBands, searchBandRes: allBands})
        }
      })
  }

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
    this.filterBand(name, this.state.bandSearch[name]);
    console.log(this.state.searchBandRes)
    console.log(this.state.showSearchResults)
  }

  componentDidMount () {
    this.getGigs();
    this.getBandOptions();
    this.getAllBands();
  }

  render() {
    return (
      <div> 
         <main>
           <section>
            <h2>Search for a band in your area</h2>
              <BandSearch handleChange={this.handleChange}
                  handleSearchSubmit={this.handleSearchSubmit}
                  bandSearch={this.state.bandSearch}
                  bandCities={this.state.bandCities}
                  bandGenres={this.state.bandGenres}
              />
            {this.state.showSearchResults 
            ? <div>
                {this.state.searchBandRes === []      // TERNARY NOT WORKING, DIV ON LINE 123 NOT RENDERING
                ? <div>Sorry, couldn't find any</div>            
                : <div>
                    {this.state.searchBandRes.map((bandObj) => {
                      return <BandCard key={bandObj._id} band={bandObj}/>
                    })}
                  </div>}
              </div>
            : <div>
                {this.state.bandsToDisplay.map((bandObj) => {
                  return <BandCard key={bandObj._id} band={bandObj}/>
                })}
              </div>}
            
           </section>

          {this.props.isLoggedIn && this.state.showAddGig
            ? <div>
                  <PostNewGig toggleAddGig={this.toggleAddGig} getGigs={this.getGigs}/>
                  <button onClick={this.toggleAddGig}>Discard</button>
              </div>
            : this.props.isLoggedIn && !this.state.showAddGig
              ? <div>
                  <p>Didn't find what you were looking for? No worries, publish your own gig and receive offers from your local musicians!</p>
                  <button onClick={this.toggleAddGig}>Post a gig</button>
                </div>
              :  <div>
                    <p>Didn't find what you were looking for? No worries, publish your own gig and receive offers from your local musicians!</p>
                    <Link to='/login'><button>Post a gig</button></Link>
                  </div>}
         </main>
         <section>
           {this.state.gigsArr.map(gig => {
             const today = new Date(Date.now());
             const gigDate = new Date(gig.date);
             if (gigDate >= today) {
              return <GigCard key={gig._id} gig={gig}/>
             }
           })}
         </section>
         <aside>FAQ link</aside>
       </div>
    )
  }
}

export default withAuth(Home);