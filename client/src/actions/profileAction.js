import axios from "axios";


import { GET_PROFILE, PROFILE_LOADING,  CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES } from "./types";


const baseurl="http://localhost:5000";
//GET current profile
export const getCurrentProfile = () => dispatch => {
 dispatch(setProfileLoading());
 axios.get(baseurl+'/api/profile')
 .then(res =>
  dispatch({
   type : GET_PROFILE,
   payload : res.data
  }),
 // this.history.push('/add-experience')
  )
  .catch(err => 
   dispatch({
    type : GET_PROFILE,
    payload : {}
   })
   );
   
};

//GET profile by handle
export const getProfileByHandle= (handle) => dispatch => {
   dispatch(setProfileLoading());
   axios.get(baseurl+`/api/profile/${handle}`)
   .then(res =>
    dispatch({
     type : GET_PROFILE,
     payload : res.data
    })
    )
    .catch(err => 
     dispatch({
      type : GET_PROFILE,
      payload : null
     })
     );
     
  };

//Add Experience
export const addExperience = (expData,history) => dispatch => {
   axios
   .post(baseurl+'/api/profile/experience',expData)
   .then(res => history.push('/dashboard'))
   .catch(err =>
      dispatch({
         type : GET_ERRORS,
         payload : err.response.data
      }))
}

//Add Education
export const addEducation = (eduData,history) => dispatch => {
   axios
   .post(baseurl+'/api/profile/education',eduData)
   .then(res => history.push('/dashboard'))
   .catch(err =>
      dispatch({
         type : GET_ERRORS,
         payload : err.response.data
      }))
}


//Delete Experience
export const deleteExperience = id => dispatch => {
   axios
   .delete(baseurl+`/api/profile/experience/${id}`)
   .then(res => 
      dispatch({
         type:GET_PROFILE,
         payload : res.data
      }))
   .catch(err =>
      dispatch({
         type : GET_ERRORS,
         payload : err.response.data
      }))
}

//Delete Education
export const deleteEducation = id => dispatch => {
   axios
   .delete(baseurl+`/api/profile/education/${id}`)
   .then(res => 
      dispatch({
         type:GET_PROFILE,
         payload : res.data
      }))
   .catch(err =>
      dispatch({
         type : GET_ERRORS,
         payload : err.response.data
      }))
}

//Get all Profiles
export const getProfiles = () => dispatch => {
   dispatch(setProfileLoading());
   axios
   .get(baseurl+'/api/profile/all')
   .then(res => 
      dispatch({
         type:GET_PROFILES,
         payload : res.data
      }))
   .catch(err =>
      dispatch({
         type : GET_PROFILES,
         payload : null
      })
      );
};

//Delete Profile & account
export const deleteAccount = () =>dispatch =>{
   if(window.confirm('Are you sure? This can NOT be undone!')){
      axios
      .delete(baseurl+'/api/profile')
      .then(res =>dispatch({
           type:SET_CURRENT_USER,
           payload:{}
      })
      )
      .catch(err =>
         dispatch({
            type:GET_ERRORS,
            payload:err.response.data
         }))
}
}
//Create Profile
export const createProfile = (profileData,history) =>dispatch => {
 
   axios
   .post(baseurl+'/api/profile/create-profile',profileData)
   .then(res => history.push('/dashboard'))
   .catch(err =>
      dispatch({
         type:GET_ERRORS,
         payload:err.response.data
      })
      );
}
//profile loading

export const setProfileLoading = () => {
 return {
  type : PROFILE_LOADING
 };
};

//clear profile
export const clearCurrentProfile = () => {
 return {
  type : CLEAR_CURRENT_PROFILE
 };
};