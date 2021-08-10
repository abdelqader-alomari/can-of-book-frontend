import React from 'react';
import Header from './Header';
import IsLoadingAndError from '../IsLoadingAndError';
import Footer from './Footer';
import Login from './Login';
import Profile from './Profile';
import Logout from './Logout';
import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from './BestBooks'


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  render() {
    console.log('app', this.props);
    const { isAuthenticated } = this.props.auth0
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                <BestBooks />
                {(isAuthenticated &&
                  <>
                    <BestBooks />
                    <Logout />
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <Login />
                  </>
                )}
              </Route>
              <Route exact path="/profile">
                {isAuthenticated && (
                  <>
                    <Profile />
                  </>
                )}
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);

