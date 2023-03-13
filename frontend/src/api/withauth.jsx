import React, { useEffect, useState } from 'react';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const [authenticated, setAuthenticated] = useState(true);
   const token = localStorage.getItem('token');

    useEffect(() => {
      if (token){
        // If the token exists, set the authenticated state to true
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    }, [token]);

    if (!authenticated) {
      // If the user is not authenticated, redirect to the login page
      return  window.location.href = '/auth/login';
    }

    // If the user is authenticated, render the wrapped component
    return  <WrappedComponent {...props} />;
  };

  return  AuthComponent;
};

export default  withAuth;
