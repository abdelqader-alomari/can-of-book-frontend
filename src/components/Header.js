import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import '../css/Header.css';
import { House, Heart } from 'bootstrap-icons-react';



class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
        <Navbar.Brand class>My Favorite Books</Navbar.Brand>
        <Link img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Tokyoship_Home_icon.svg/1200px-Tokyoship_Home_icon.svg.png" to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <>
          <House height={68} width={68} style={{ marginLeft: "47.5%" }} />
          <Heart height={70} width={65} style={{ marginLeft: "3.3%", marginTop: "0.5%" }} />
        </>

        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
      </Navbar>
    );
  }
}

export default Header;
