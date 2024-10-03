import React, { useState } from 'react';
import './Sidebar.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTachometerAlt, faTag, faBoxOpen, faBullhorn, faChartLine, faMoneyBillAlt, faFileImport, faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Import icons

const Sidebar = ({ isOpen }) => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // Menu items data
  const menuItems = [
    { name: 'Dashboard', icon: faTachometerAlt, link: '#' },
    { name: 'User Details', icon: faUserCircle, link: '/viewUser' },
    { name: 'Order Details', icon: faTag, link: '/orderList' },
    { name: 'Product Details', icon: faBoxOpen, link: '/productList' }, // Updated link to ProductList.js
    { name: 'Promotions', icon: faBullhorn, link: '#' },
    { name: 'Reports', icon: faChartLine, link: '#' },
    { name: 'Inventory', icon: faMoneyBillAlt, link: '#' },
    { name: 'Super XML Import', icon: faFileImport, link: '#' },
  ];

  // Filter the menu items based on the search term
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      <ul className="sidebar-menu">
        {filteredItems.map((item, index) => (
          <li key={index}>
            <a href={item.link}>
              <FontAwesomeIcon icon={item.icon} />
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
