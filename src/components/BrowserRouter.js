import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from '../BestBooks';
import LoginButton from './LoginButton';
import Profile from './Profile'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class BrowserRouter extends Component {
    render() {
        return (
            <>
                <Router>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                </Router>
                <Switch>
                    <Route exact path='/'>
                        {
                            this.props.auth0.isAuthenticated ?
                                <BestBooks />
                                : <LoginButton />
                        }
                    </Route>
                    <Route path='/profile'>
                        <Profile />
                    </Route>
                </Switch>
            </>
        )
    }
}

export default withAuth0(BrowserRouter);
