import React, { Component } from 'react';
import {withRouter,Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaField from '../common/TextAreaField';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import {createProfile ,getCurrentProfile}from '../../actions/profileAction';
import isEmpty from '../../validation/is-empty';

 class EditProfile extends Component {
  constructor(props){
   super(props);
   this.state = {
    displaySocialInputs : false,
    handle : '',
    company : '',
    website  :'',
    location : '',
    status : '',
    skills : '',
    githubusername: '',
    bio : '',
    twitter : '',
    linkedin:'',
    facebook:'',
    youtube:'',
    instagram:'',
    errors : {}
   };

   this.onChange = this.onChange.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
   this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({ errors: nextProps.errors});
      }

      if(nextProps.profile.profile){
         const profile =  nextProps.profile.profile;
         //Bring skills array back to csv
         const skillsCSV = profile.skills.join(',');

         //if profile field does not exist,make empty string
         profile.company = !isEmpty(profile.company) ? profile.company : '';
         profile.website = !isEmpty(profile.website) ? profile.website : '';
         profile.location = !isEmpty(profile.location) ? profile.location : '';
         profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
         profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
         profile.social = !isEmpty(profile.social) ? profile.social: {};
         profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
         profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
         profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
         profile.youtube = !isEmpty(profile.social.youtube)?profile.social.youtube:'';
         profile.instagram = !isEmpty(profile.social.instagram)?profile.social.instagram:'';
        
         //set component fields status
         this.setState({
          handle : profile.handle,
          company : profile.company,
          website : profile.website,
          location : profile.location,
          skills : skillsCSV,
          status : profile.status,
          projects: profile.projects,
          githubusername : profile.githubusername,
          bio : profile.bio,
          twitter : profile.twitter,
          linkedin : profile.linkedin,
          youtube : profile.youtube,
          facebook : profile.facebook,
          instagram:profile.instagram
         })

      }
  }

  onSubmit(e){
    e.preventDefault();
   
    const profileData = {
      handle : this.state.handle,
      company : this.state.company,
      website : this.state.website,
      location : this.state.location,
      skills : this.state.skills,
      status : this.state.status,
      projects : this.state.projects,
      githubusername : this.state.githubusername,
      bio : this.state.bio,
      twitter : this.state.twitter,
      linkedin : this.state.linkedin,
      facebook : this.state.facebook,
      youtube : this.state.youtube,
      instagram:this.state.instagram
    }
    this.props.editProfile(profileData,this.props.history);
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});

  }
 render() {
    const { errors , displaySocialInputs} = this.state;
    let socialInputs;
    if(displaySocialInputs){
      socialInputs = (
        <div>
          <InputGroup
          placeholder="Twitter Profile URL"
          name = "twitter"
          icon = "fab fa-twitter"
          value = {this.twitter}
          onChange = {this.onChange}
          errors = {errors.twitter}
          />
           <InputGroup
          placeholder="Linkedin Profile URL"
          name = "linkedin"
          icon = "fab fa-linkedin"
          value = {this.linkedin}
          onChange = {this.onChange}
          errors = {errors.linkedin}
          />
           <InputGroup
          placeholder="Instagram Profile URL"
          name = "instagram"
          icon = "fab fa-instagram"
          value = {this.instagram}
          onChange = {this.onChange}
          errors = {errors.instagram}
          />
           <InputGroup
          placeholder="Youtube Profile URL"
          name = "youtube"
          icon = "fab fa-youtube"
          value = {this.youtube}
          onChange = {this.onChange}
          errors = {errors.youtube}
          />
          <InputGroup
          placeholder="Facebook Profile URL"
          name = "facebook"
          icon = "fab fa-facebook"
          value = {this.facebook}
          onChange = {this.onChange}
          errors = {errors.facebook}
          />
        </div>
      )
    }
    //select option
    const options = [
      {label: "*Select Original Status", value:0 },
      {label: "Bachelor Degree",value : 'Bachelor Degree'},
      {label : "Master Degree" , value:'Master Degree'},
      {label : "Developer ", value : "Developer"},
      {label :  "Junior Developer", value :"Junior Developer"},
      {label :  "Senior Developer", value :"Senior Developer"},
      {label :  "Manager", value :"Manager"},
      {label :  "Intern", value :"Intern"},
      {label :  "Other", value :"Other"}
    ]
  return (
   <div className = "edit-profile">
    <div className = " container">
     <div className = "row">
      <div className = " col-md-8 m-auto">
      <Link to ="/dashboard" className = "btn btn-light">
        Go Back
       </Link>
        <h1 className = "display-4 text-center"> Edit Your Profile</h1>
       
        <small className = "d-block pb-3">* =required fields</small>
        <form onSubmit = {this.onSubmit}>
         <TextFieldGroup
             placeholder = "* Profile Handle"
             name = "handle"
             value = {this.state.handle}
             onChange = {this.onChange}
             error = {errors.handle}
             info = "A unique handle for your profile URL.Your fullname,company name, nick name"
         />
          <SelectListGroup
             placeholder = "Status"
             name = "status"
             value = {this.state.status}
             onChange = {this.onChange}
             options = {options}
             error = {errors.status}
             info = "Give us an idea of where you are at in your career"
         />
          <TextFieldGroup
             placeholder = "Company"
             name = "company"
             value = {this.state.company}
             onChange = {this.onChange}
             error = {errors.status}
             info = "Your working company status"
         />
          <TextFieldGroup
             placeholder = "Website"
             name = "website"
             value = {this.state.website}
             onChange = {this.onChange}
             error = {errors.website}
             info = "Refer a websites of your projects"
         />
          <TextFieldGroup
             placeholder = "Location"
             name = "location"
             value = {this.state.location}
             onChange = {this.onChange}
             error = {errors.location}
             info = "Your verifyed Address city or state"
         />
          <TextFieldGroup
             placeholder = "Skills"
             name = "skills"
             value = {this.state.skills}
             onChange = {this.onChange}
             error = {errors.skills}
             info = "Provide Skills in language(eg.HTML,CSS,etc)"
         />
          <TextFieldGroup
             placeholder = "Projects"
             name = "projects"
             value = {this.state.projects}
             onChange = {this.onChange}
             error = {errors.projects}
             info = "Include your unique projects"
         />
          <TextFieldGroup
             placeholder = "Github username"
             name = "githubusername"
             value = {this.state.githubusername}
             onChange = {this.onChange}
             error = {errors.githubusername}
             info = "Include your Github name"
             />
               <TextAreaField
             placeholder = "Short bio"
             name = "bio"
             value = {this.state.bio}
             onChange = {this.onChange}
             error = {errors.bio}
             info = "Tells us little about yourself"
             />

             <div className = "mb-3">
               <button 
               type = "button"
               onClick = {() => {
                 this.setState(prevState => ({
                   displaySocialInputs : !prevState.displaySocialInputs
                 }));
                }}
                className = "btn btn-light">Add Social Network Links</button>
                <span className = " text-muted">Optional</span>
             </div>
             {socialInputs}
             <input type = "submit" value="Submit" className = "btn btn-info btn-block" />
        </form>
      </div>
     </div>
    </div>
    
   </div>
  )
 }
}

EditProfile.propTypes = {
 createProfile : PropTypes.func.isRequired,
 getCurrentProfile : PropTypes.func.isRequired,
 profile : PropTypes.object.isRequired,
 errors : PropTypes.object.isRequired
}
const mapStateToProps = state => ({
 profile : state.profile,
 errors : state.errors
});

export default connect(mapStateToProps,{createProfile  , getCurrentProfile})
(withRouter(EditProfile));