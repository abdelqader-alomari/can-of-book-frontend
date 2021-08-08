import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton'
import { Card } from 'react-bootstrap'
function Login() {
    const {
        isAuthenticated,
    } = useAuth0();

    return !isAuthenticated && (
        <Card style={{ width: '18rem', textAlign: 'center', background: "#111", color: "white", marginLeft: "40%" }}>
            <Card.Body>
                <Card.Title>Login</Card.Title>
                <Card.Text>
                    Click Below to Login
                </Card.Text>
                {/* TODO: add a `LoginButton` component here that will log the user in with Auth0 */}
                <LoginButton />
            </Card.Body>
        </Card>
    );
}

export default Login;
