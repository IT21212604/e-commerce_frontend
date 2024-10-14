import React from "react";
import BannerImage from "../../Assets/home-banner-image.jpg";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Home.css";

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
            Sellforce<span style={{ color: "red" }}>+</span>
          </h1>
          <p className="primary-text">
            Manage your online store with ease and efficiency! Our comprehensive
            e-commerce back-office system empowers users to operate seamlessly
            and enhance customer satisfaction.
          </p>
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
