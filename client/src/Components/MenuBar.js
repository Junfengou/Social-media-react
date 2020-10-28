import React, { useState } from 'react';
import { Menu } from "semantic-ui-react"
import { Link } from "react-router-dom";

function MenuBar() {
  
    //purpose of this is for navigation highlighting the correct corresponding tab
  const pathname = window.location.pathname; // current path the user is on

  const path = pathname === '/' ? 'home' : pathname.substr(1); // /login

  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  console.log("pathname: ", pathname)

  return(
      <Menu pointing secondary size="massive" color="teal">
          {/* <Menu.Item name="home" active={activeItem === 'home'} onClick={handleItemClick} /> */}
          <Menu.Item 
          name="home" 
          active={activeItem === 'home'} 
          onClick={handleItemClick} 
          as={Link}
          to="/"
          />

    

    <Menu.Menu position="right">

        <Menu.Item 
          name="login" 
          active={activeItem === 'login'} 
          onClick={handleItemClick} 
          as={Link}
          to="/login"
          />

        <Menu.Item 
          name="register" 
          active={activeItem === 'register'} 
          onClick={handleItemClick} 
          as={Link}
          to="/register"
          />
        </Menu.Menu>
      </Menu>
    
  )
  
}

export default MenuBar;