import React, { Component} from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authAction';
import { clearCurrentProfile} from './actions/profileAction';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import Contactus from './components/contact/Contactus';
import EditProfile from './components/edit-profile/EditProfile';
import './App.css';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import PDF from './components/generatePDF/PDF';

//check for token
if(localStorage.jwtToken) {
  //set authToken header auth
  setAuthToken(localStorage.jwtToken);
  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
     //logout user
     store.dispatch(logoutUser());
     //clear current profile
     store.dispatch(clearCurrentProfile());
     //Redirect to login
     window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
         <div className="App">
        <Navbar />
        <Route exact path = "/" component = { Landing } />
         <div className = "container">
          <Route exact path = "/register" component = {Register} />
          <Route exact path = "/login" component = {Login} />
          <Route exact path = "/profiles" component = {Profiles} />
          <Route exact path = "/profile/:name" component = {Profile} />
          <Route exact path = "/pdf" component = {PDF} />
          <Switch>
          <PrivateRoute exact path = "/dashboard" component = {Dashboard} />
          </Switch>
          <Switch>
          <PrivateRoute exact path = "/create-profile" component = {CreateProfile} />
          </Switch>
          <Switch>
          <PrivateRoute exact path = "/edit-profile" component = {EditProfile} />
          </Switch>
          <Switch>
          <PrivateRoute exact path = "/add-experience" component = {AddExperience} />
          </Switch>
          <Switch>
          <PrivateRoute exact path = "/add-education" component = {AddEducation} />
          </Switch>
          <Route exact path = "/contactus" component = {Contactus} />
      </div> 
      </div>
      </Router>
      </Provider>
      
     
    );
  }
 
}

export default App;
