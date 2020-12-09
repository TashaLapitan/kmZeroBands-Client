import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from './../context/auth-context';

// Route that only allows access to a user who is not logged in

function AnonRoute (routeProps) {
  
  const { isLoggedIn, isLoading } = routeProps;

  const ComponentToShow = routeProps.component;
  const { exact, path } = routeProps;

  if (isLoading) return 'Loading';

  return (
    <Route
      exact={exact}
      path={path}
      render={
        function(props) {
          if (isLoggedIn) return <Redirect to="/my-profile" />
          else if (! isLoggedIn) return <ComponentToShow {...props} />
        }
      }
     />
    )
}


export default withAuth(AnonRoute);
