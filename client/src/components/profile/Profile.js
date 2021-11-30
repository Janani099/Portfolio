import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from'prop-types';
import {Link} from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import Spinner from 'react-spinners';
import {getProfileByHandle} from '../../actions/profileAction';
import PDF from '../generatePDF/PDF';
import jsPDF from 'jspdf';

 class Profile extends Component {

  constructor(props){
    super(props)
    this.state ={}
   }

  componentDidMount(){
   if(this.props.match.params.handle) {
    this.props.getProfileByHandle(this.props.match.params.handle);
   }
  }
 render() {
  const {profile,loading} =this.props.profile;
  let profileContent;

  if(profile ==null || loading) {
   profileContent = <Spinner />
  }else {
   profileContent = (
    <div>
     <div className = "row">
      <div className = "col-md-6">
       <Link to = "/dashboard" className = "btn btn-light mb-3 float-left">
        Back to Dashboard
       </Link>
      </div>
      <div className = "col-md-6">
      <Link to = "/pdf" className = "btn btn-light mb-3 float-left">
        Download PDF
       </Link>
       
      </div>
     </div>
     <ProfileHeader profile = {profile} />
     <ProfileAbout profile = {profile}/>
     <ProfileCreds 
      education= {profile.education}
      experience={profile.experience} />
     
    </div>
    
   );
   }
  return (
   <div className ="profile">
    <div className = "container"> 
    <div className = "row">
     <div className = "col-md-12"> 
        {profileContent}
     </div>
    </div>
    </div>
    

   </div>
  
  )
 }
}

Profile.propTypes = {
 getProfileByHandle : PropTypes.func.isRequired,
 profile : PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile : state.profile
})
export default connect(mapStateToProps,{getProfileByHandle})(Profile);