import React, { useState } from "react";
import "./Sidebar.css"; // Import the CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTachometerAlt,
  faTag,
  faBoxOpen,
  faBullhorn,
  faChartLine,
  faMoneyBillAlt,
  faFileImport,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons"; // Import icons

const Sidebar = ({ isOpen, user }) => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Define menu items with role-based permissions
  const menuItems = [
    {
      name: "Dashboard",
      icon: faTachometerAlt,
      link: "#",
      roles: ["Administrator", "Vendor", "CSR"],
    },
    {
      name: "User Details",
      icon: faUserCircle,
      link: "/viewUser",
      roles: ["Administrator"],
    }, // Admin only
    {
      name: "Order Details",
      icon: faTag,
      link: "/orderList",
      roles: ["Administrator", "CSR", "Vendor"],
    },
    {
      name: "Activation/Deactivation Products",
      icon: faBoxOpen,
      link: "/ProductList",
      roles: ["Administrator"],
    },
    {
      name: "Product Details",
      icon: faBullhorn,
      link: "/productDetails",
      roles: ["Vendor"],
    }, // Vendor only
    { name: "Reports", icon: faChartLine, link: "#", roles: ["Administrator"] }, // Admin only
    {
      name: "Inventory",
      icon: faMoneyBillAlt,
      link: "/viewInventory",
      roles: ["Administrator"],
    }, // Admin only
    {
      name: "Super XML Import",
      icon: faFileImport,
      link: "#",
      roles: ["Administrator"],
    }, // Admin only
  ];

  // Filter the menu items based on the search term
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
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
        {filteredItems.map((item, index) => {
          const isAuthorized = user && item.roles.includes(user.role);

          return (
            <li key={index} className={isAuthorized ? "" : "disabled"}>
              <a
                href={isAuthorized ? item.link : "#"}
                className={isAuthorized ? "" : "disabled-link"}
              >
                <FontAwesomeIcon icon={item.icon} />
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
