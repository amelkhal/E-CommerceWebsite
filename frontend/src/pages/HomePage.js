import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  return (
    <div className="container text-center">
      <h1 className="display-4 mb-4">Welcome to BookDeals</h1>
      <p className="lead mb-4">Discover your next favorite book with us!</p>
      <div className="d-flex justify-content-center mt-4">
        <Link to="/books">
          <img 
            src="/images/bookstore-logo.png" 
            alt="BookStore Logo" 
            className="img-fluid" 
            style={{ maxHeight: 'auto', width: 'auto' }} // Adjust the height and width as needed
          />
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
