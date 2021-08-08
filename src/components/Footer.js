import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar class collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ position: "absolute", top: '92.5%', width: '100%' }} >
        <Navbar.Brand >&copy; Best Books</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
