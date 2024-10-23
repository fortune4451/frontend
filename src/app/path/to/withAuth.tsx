import React, { useEffect } from 'react';

// HOC to protect routes
function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const WithAuthComponent = (props: P) => {

    useEffect(() => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      if (!token) {
        // Redirect to login if no token is found using window.location.href
        window.location.href = '/login';
      }
    }, []);

    // Return the WrappedComponent with the passed props
    return <WrappedComponent {...props} />;
  };

  // Setting a display name for easier debugging
  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
}

export default withAuth;
