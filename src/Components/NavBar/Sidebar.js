import React from 'react';
import './Sidebar.css'; // Importing the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTachometerAlt, faTag, faBoxOpen, faBullhorn, faChartLine, faMoneyBillAlt, faFileImport, faUserCircle, faCogs, faNewspaper } from '@fortawesome/free-solid-svg-icons'; // Import icons

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Sellforce</h2>
        <p>Your Sales Solution</p>
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search" />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faTachometerAlt} />
            Dashboard
          </a>
        </li>
        <li className="active">
          <a href="#">
            <FontAwesomeIcon icon={faTag} />
            Sales
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faBoxOpen} />
            Product <span className="badge">57</span>
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faBullhorn} />
            Promotions
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faChartLine} />
            Reports
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            Sell On Emag
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faFileImport} />
            Super XML Import
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faUserCircle} />
            ERP / CRM
          </a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <h3>CONFIGURATION</h3>
        <ul>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faCogs} />
              Settings
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faNewspaper} />
              News <span className="new-badge">New</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
