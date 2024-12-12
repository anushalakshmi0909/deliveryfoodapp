import React from 'react';
import './Home.css';
import restaurantIcon from '../images/restaurant_icon.png';  
import peopleIcon from '../images/people_icon.png';
import happyServiceIcon from '../images/happy_service_icon.png';
import usersIcon from '../images/user_icon.png';

const Home = () => {
  return (
    <div className="home-content">
      <h1>Order Food Online From the Best Restaurants</h1>
      
      <div className="search-bar">
        <input type="text" placeholder="Restaurant Name" />
        <input type="text" placeholder="Search Location" />
        <button>Search</button>
      </div>

      <div className="stats">
        <div>
          <img src={restaurantIcon} alt="Restaurants" />
          <h3>137</h3>
          <p>Restaurants</p>
        </div>
        <div>
          <img src={peopleIcon} alt="People Served" />
          <h3>158</h3>
          <p>People Served</p>
        </div>
        <div>
          <img src={happyServiceIcon} alt="Happy Service" />
          <h3>659K</h3>
          <p>Happy Service</p>
        </div>
        <div>
          <img src={usersIcon} alt="Regular Users" />
          <h3>235</h3>
          <p>Regular Users</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
