import React from 'react';
import Background from '../images/background.jpg';
import { Link } from 'react-router-dom';

/**
 * This component renders the home page of the application.
 * It displays a background image, a title, and a button to navigate to the "Find Blood" page.
 *
 * @returns {JSX.Element} The rendered component.
 */
const Home = () => {
  // CSS styles for the home page background
  const homeCss = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: '0.75',
  };

  return (
    <div>
      <div style={homeCss} className="vh-100 d-flex align-items-center">
        <div className="container text-white">
          <h1>Be Greatful and Donate<br />Blood</h1>
          <h5 >Save life and be a Real Hero</h5>
          <Link to="/findblood" className="btn btn-light">Find Blood</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;