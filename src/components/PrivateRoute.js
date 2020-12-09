import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from './../context/auth-context';


function PrivateRoute (routeProps) {

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
          if (! isLoggedIn) return <Redirect to="/login" />;
          else if (isLoggedIn) return <ComponentToShow {...props} />;
        }
      }
     />
    )
}


export default withAuth(PrivateRoute);


/* 
// Concise way
function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
   <Route
    {...rest}
    render={ (props)  => isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />}
   /> 
)} 
*/
