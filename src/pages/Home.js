import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withAuth } from './../context/auth-context';

import gigService from './../lib/gig-service';

import PostNewGig from './../components/PostNewGig';
import GigCard from './../components/GigCard';

class Home extends Component {

  state = {
    showAddGig: false,
    gigsArr: []
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

  componentDidMount () {
    this.getGigs();
  }

  render() {
    return (
      <div> 
         <main>
           <section>Search component</section>
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