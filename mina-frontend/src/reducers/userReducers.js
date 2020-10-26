import {
    USER_DETAILS_FAILURE,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_SIGNIN_FAILURE,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    USER_SIGNUP_FAILURE,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_UPDATE_PROFILE_FAILURE,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants";

//definign the reducer for user sign in. As laways reducer function accepts two parameters. We set the state parameter to be an empty object. 
export const userSignInReducer = (state = {}, action) => {
    //inside we switch for different action type scenarios
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            //in case of a sign in request we want to set loading to true
            return {
                loading: true
            };
        case USER_SIGNIN_SUCCESS:
            //if the sign in was successful we want to stop loading and fill in userInfo in our localStorage with the payload of this action which is the returned user data from the server
            return {
                loading: false, userInfo: action.payload
            };
        case USER_SIGNIN_FAILURE:
            //if the sign in request fails we want to stop loading and we want to fill error with the payload of this action
            return {
                loading: false, error: action.payload
            };
        case USER_SIGNOUT:
            //in case of a sign out we return an empty object that actually removes all the data inside userInfo in localStorage
            return {};
        default:
            //the default case here is to return the previous state
            return state;
    }
};

//duplicatig user sign in reducer to create user sign up reducer based on it
export const userSignUpReducer = (state = {}, action) => {
    //inside we switch for different action type scenarios
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            //in case of a sign in request we want to set loading to true
            return {
                loading: true
            };
        case USER_SIGNUP_SUCCESS:
            //if the sign in was successful we want to stop loading and fill in userInfo in our localStorage with the payload of this action which is the returned user data from the server
            return {
                loading: false, userInfo: action.payload
            };
        case USER_SIGNUP_FAILURE:
            //if the sign in request fails we want to stop loading and we want to fill error with the payload of this action
            return {
                loading: false, error: action.payload
            };
        default:
            //the default case here is to return the previous state
            return state;
    }
};

//since we get user details at the beginning of our profile page laoding we set loading: true as the default state here
export const userDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return { loading: true };
      case USER_DETAILS_SUCCESS:
        return { loading: false, user: action.payload };
      case USER_DETAILS_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
        return { loading: true };
      case USER_UPDATE_PROFILE_SUCCESS:
        return { loading: false, success: true };
      case USER_UPDATE_PROFILE_FAILURE:
        return { loading: false, error: action.payload };
      case USER_UPDATE_PROFILE_RESET:
        return {};
      default:
        return state;
    }
  };