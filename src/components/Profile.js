import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Card } from 'react-bootstrap'

class Profile extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        return (
            <> {isAuthenticated && (
                <Card style={{ width: '18rem', marginLeft: '40%', marginTop: '5%' }}>
                    <Card.Img
                        variant="top"
                        src={user.picture}
                        alt={user.name}
                    />
                    <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Text>{user.email}</Card.Text>
                    </Card.Body>
                </Card>
            )}
            </>
        );
    }
}

export default withAuth0(Profile);
