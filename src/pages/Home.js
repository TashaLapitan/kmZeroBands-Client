import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PostNewGig from './../components/PostNewGig';
import { withAuth } from './../context/auth-context';

class Home extends Component {

  state = {
    showAddGig: false
  }

  toggleAddGig = () => {
    this.setState({showAddGig: !this.state.showAddGig});
  }

  render() {
    return (
      <div> 
         <main>
           <section>Search component</section>
          {this.props.isLoggedIn && this.state.showAddGig
            ? <div>
                  <PostNewGig toggleAddGig={this.toggleAddGig}/>
                  <button onClick={this.toggleAddGig}>Discard</button>
              </div>
            : this.props.isLoggedIn && !this.state.showAddGig
              ? <div>
                  <p>Didn't find what you were looking for? No worries, publish your own gig and receive offers from your local musicians!</p>
                  <button onClick={this.toggleAddGig}>wrong button if logged out</button>
                </div>
              :  <div>
                    <p>Didn't find what you were looking for? No worries, publish your own gig and receive offers from your local musicians!</p>
                    <Link to='/login'><button>Post a gig</button></Link>
                  </div>}
         </main>
         <section>
           Map through GigAd components + show more gigs button
         </section>
         <article>little article + link to publish band/login</article>
         <aside>FAQ link</aside>
       </div>
    )
  }
}

export default withAuth(Home);