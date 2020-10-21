import {
    USER_SIGNIN_FAILURE,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT
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