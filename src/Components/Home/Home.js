import React from "react";
import BannerImage from "../../Assets/home-banner-image.jpg";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login"); // Navigates to the login page
  };

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
          ClickUp<span style={{color:'red'}}>+</span>
          </h1>
          <p className="primary-text">
            Manage your employees efficiently with our powerful tools.
            Our system is designed to streamline your HR processes, 
            enabling you to focus on what truly matters—growing your business.
          </p>
          {/* <ul className="features-list">
            <li>✔️ Easy Employee Onboarding: Seamlessly add new employees and manage their details with our user-friendly interface.</li>
            <li>✔️ Comprehensive Employee Profiles: Store and access detailed employee information including contact details, job roles, and performance metrics.</li>
          </ul> */}
          <button className="secondary-button" onClick={handleGetStarted}>
            Get Started <FiArrowRight />
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="Home Banner" className="banner-image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
