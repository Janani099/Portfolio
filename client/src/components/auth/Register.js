import React , { Component } from 'react';
import {PropTypes} from 'prop-types';
import './Register.css';
import { withRouter } from 'react-router-dom';
// import classnames from 'classnames';
import { connect} from 'react-redux';
import { registerUser} from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    constructor() {
        super();
        this.state = {
          name : '',
          email : '',
          password : '',
          password2 : '',
          errors : {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.errors){
        this.setState({errors: nextProps.errors})
      }

    }

    onChange(e) {
      this.setState({[e.target.name] : e.target.value});
    }
    onSubmit(e) {
     

      const newUser = {
        name:this.state.name,
        email:this.state.email,
        password:this.state.password,
        password2:this.state.password2
      };

       this.props.registerUser(newUser,this.props.history);
      e.preventDefault();
      
    }
    render(){
      const {errors}= this.state;
      
    
      return (
        <div className="register">
         
                 
                  <h1>Sign Up</h1>
                  <hr />
                   <p className="content">Create your account</p>
                   <form noValidate onSubmit = {this.onSubmit}>
                   <TextFieldGroup 
                        placeholder = "Name"
                        name = "name"
                        value = {this.state.name}
                        onChange = { this.onChange}
                        error = {errors.name}
                     />
       
                
       <TextFieldGroup 
           placeholder = "Email address"
           name = "email"
           type = "email"
           value = {this.state.email}
           onChange = { this.onChange}
           error = {errors.email}
           />
       
               
       <TextFieldGroup 
           placeholder = "Password"
           name = "password"
           type = "password"
           value = {this.state.password}
           onChange = { this.onChange}
           error = {errors.password}
           />
       
                  
       <TextFieldGroup 
           placeholder = "Confirm Password"
           name = "password2"
           type = "password2"
           value = {this.state.password2}
           onChange = { this.onChange}
           error = {errors.password2}
           />
       
             
                  <input type = "submit" className = "reg btn-info btn-block mt-4"></input>
                  </form>
              </div>
       )
    }
 
}

Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
};

const mapStateToProps  = (state) => ({
  auth : state.auth,
  errors:state.errors
});

export default connect(mapStateToProps , { registerUser}) (withRouter (Register));
