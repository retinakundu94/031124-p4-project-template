// App.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from './Header';
import Footer from './Footer';

const stripePromise = loadStripe('pk_test_51PQK0VRsg0rgFOjdjyrofI48VnChdB5iADGZouAZkgf3eCOgdujw8yUgvePwU3zlEswJeVI5toGrMKwo6BlB3x4z00sYHE73hl');

function App() {

  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <Elements stripe={stripePromise}>
    <div className={`app ${isHomePage ? 'home-page' : ''}`}>
      <Header />
      <Outlet />
      <Footer />
    </div> 
    </Elements>
  );
}

export default App;

