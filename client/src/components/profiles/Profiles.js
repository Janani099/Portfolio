import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProfiles} from '../../actions/profileAction';
import Spinner from 'react-spinners';
import ProfileItem from './ProfileItem';


class Profiles extends Component {
 componentDidMount(){
  this.props.getProfiles();
 }
 render() {
  const { profiles,loading } = this.props.profile;
  let profileItems;

  if(profiles == null || loading) {
   profileItems = <Spinner />;
 
  }else {
   if(profiles.length >0) {
    profileItems = profiles.map(profile =>(
      <ProfileItem key = {profile._id} profile = {profile}/>
    ))
   }else {
    profileItems = <h4>No Profiles found...</h4>
   }
  }
  

  return (
   <div className = "profiles">
    <div className = "container">
     <div className = "row">
       <div className = "col-md-12">
         <h1 className = "display-4 text-center">User Profiles</h1>
         <p className = "lead text-center">
          Browse,connect,create on your own
         </p>
         {profileItems}
       </div>
     </div>
    </div>
    
   </div>
  )
 }
}

Profiles.propTypes = {
 getProfiles :PropTypes.func.isRequired,
 profile : PropTypes.object.isRequired
}

const mapStateToProps = state =>({
 profile : state.profile
})
export default connect(mapStateToProps,{getProfiles})(Profiles) ;