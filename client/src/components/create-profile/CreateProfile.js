import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaField from '../common/TextAreaField';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import {createProfile }from '../../actions/profileAction';

 class CreateProfile extends Component {
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
    projects : '',
    githubusername: '',
    bio : '',
    twitter : '',
    linkedin:'',
    youtube :'',
    instagram:'',
    facebook:'',
    errors : {}
   };

   this.onChange = this.onChange.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({ errors: nextProps.errors});
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
    this.props.createProfile(profileData,this.props.history);
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
   <div className = "create-profile">
    <div className = " container">
     <div className = "row">
      <div className = " col-md-8 m-auto">
        <h1 className = "display-4 text-center"> Create Your Profile</h1>
        <p className = "lead text-center">
         Let's get some information to make your profile stand out
        </p>
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
             value = {this.state.slocation}
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
             value = {this.state.gbio}
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

CreateProfile.propTypes = {
 profile : PropTypes.object.isRequired,
 errors : PropTypes.object.isRequired
}
const mapStateToProps = state => ({
 profile : state.profile,
 errors : state.errors
});

export default connect(mapStateToProps,{createProfile})
(withRouter(CreateProfile));