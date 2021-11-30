import React ,{ Component } from 'react';
import './Navbar.css';
// import {FaBars,FaTimes} from 'react-icons/fa';
import {PropTypes} from 'prop-types';
import { connect} from 'react-redux';
import { AiFillFunnelPlot} from "react-icons/ai";
import {Link} from 'react-router-dom';
import { logoutUser } from '../../actions/authAction';
import {clearCurrentProfile} from '../../actions/profileAction';


class Navbar extends Component{
    onLogoutClick(e){
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }
    render(){
          const { isAuthenticated,user } = this.props.auth;
          const authLinks = (
              <ul className = "navbar-nav ml-auto">
                   <li className="nav-item">
                        <a href = "" onClick = {this.onLogoutClick.bind(this)} className="nav-link">
                            <img 
                            className = "rounded-Circle"
                            src={user.avatar}
                             alt={user.name}
                             style={{ width: '25px',marginRight:'5px'}}
                              title="you must have a gravatar" />{' '}
                            Signout
                        </a>
                     </li>
              </ul>
          );

          const guestLinks = (
            <ul className = "navbar-nav ml-auto">
            <li className="nav-item">
                  <Link className="nav-link" to="/login">
                     Sign in
                  </Link>
              </li>
              
              <li className="nav-item">
                  <Link className="nav-link" to="/register">
                     Sign up
                  </Link>
              </li>
            </ul>
          );


        // const [click,setClick] = useState(false);
        // const clickHandler =() =>{
        //     setClick(!click);
        // }
        return (
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
              <div className="container">
                  <h1 className="logo"><AiFillFunnelPlot />Port<span>folio</span></h1>
                  {/* <ul className={click ? "nav-list active" : "nav-list"}> */}
                  <ul className="navbar-nav mr-auto">
                     <li className="nav-item">
                         <Link className="nav-link" to="/">
                             Home
                         </Link>
                     </li>
                    
                     <li className="nav-item">
                         <Link className="nav-link" to="/about">
                             {' '}
                            About
                         </Link>
                     </li>
                     <li className="nav-item">
                         <Link className="nav-link" to="/pdf">
                             {' '}
                            Generate PDF
                         </Link>
                     </li>
                    
                     <li className="nav-item">
                         <Link className="nav-link" to="/contactus">
                          Contact Us
                         </Link>
                     </li>
    
                    
                  </ul>
                  {isAuthenticated ? authLinks : guestLinks}
    
                  {/* <div onClick={clickHandler} className="ham-menu">
                      {click ? <FaTimes/> :<FaBars/>}
                  </div> */}
              </div>
    
          </nav>
        )
    }
   
}
   


Navbar.propTypes = {
    logoutUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth:state.auth
});

export default connect(mapStateToProps, { logoutUser,clearCurrentProfile })(Navbar);
