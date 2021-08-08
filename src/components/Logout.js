import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import { Card } from 'react-bootstrap'

function Logout() {
    const {
        isAuthenticated
    } = useAuth0();

    return isAuthenticated && (
        <Card style={{ width: '18rem', textAlign: 'center', background: "#111", color: "white", marginLeft: "0%", marginTop: "25%" }}>
            <Card.Body>
                <Card.Title>Logout</Card.Title>
                <Card.Text>
                    Click Below to Logout
                </Card.Text>
                <LogoutButton />
            </Card.Body>
        </Card>
    );
}

export default Logout;
