import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
// import { Card } from 'react-bootstrap'

function Logout() {
    const {
        isAuthenticated
    } = useAuth0();

    return isAuthenticated && (
        <div style={{ position: 'absolute', left: '93%', top: '5%' }}><LogoutButton /></div>
    );
}

export default Logout;
