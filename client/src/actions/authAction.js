import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER} from './types';
import jwt_decode from 'jwt-decode';

const baseurl="http://localhost:5000/";
//Register User
export const registerUser = (userData,history) => dispatch => {

    console.log("userData",userData)
     const headers = {
          'Content-Type': 'application/json'
        }
     axios.post(baseurl+'api/users/register',userData,{
           headers:headers
     }).then(res => 
           console.log(res),
          history.push('/login')
          
      )
      .catch(err =>

       dispatch({
        type: GET_ERRORS,
        payload: err.response.data
       })
       );
 
};

export const loginUser = (userData) => dispatch => {
     axios
     .post(baseurl+'api/users/login' , userData)
     .then(res => {
//save to local storage
         const {token} =res.data;
         //set token to ls
         localStorage.setItem('jwtToken ', token);
         //set token to auth header
         setAuthToken(token);
         //decode taken to get user data
         const decoded = jwt_decode(token);
         //set current user
         dispatch(setCurrentUser(decoded));
         //push data
         
     })
     .catch(err => 
          dispatch({
               type : GET_ERRORS,
               payload:err.response.data
          }));
};

//set logged in user
export const setCurrentUser = (decoded) => {
     return{
          type : SET_CURRENT_USER,
          payload:decoded
     };
};

//log user out
export const logoutUser = () => dispatch => {
     //Remove token from localstorage
     localStorage.removeItem('jwtToken');
     //Remove auth header for further request
     setAuthToken(false);
     //set current user to {} which will set isAuthenticated to false
     dispatch(setCurrentUser({}))
}