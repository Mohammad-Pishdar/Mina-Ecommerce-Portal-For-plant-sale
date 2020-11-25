import Axios from "axios"
import {
    USER_SIGNIN_FAILURE,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    USER_SIGNUP_FAILURE,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAILURE,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAILURE
} from "../constants/userConstants"

//defining a sign-in action. Like all the other actions, this function also returns an async function and passes redux thunk dispatch function as its argument.
export const signIn = (email, password) => async (dispatch) => {
    //First we dispatch user sign in request. We also have to import the appropriate action at the top. The payload for this request is the email and password entered by the user.
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: {
            email,
            password
        }
    })
    //Now we're sending an ajax request and we use try catch technique to catch any potential errors.
    try {
        //sending an ajax request. We use a post request here in our ajax call because the sign in API works with a post request. The first parameter here is the URL address of the API and the second one is the data we use to send the request.
        const {
            data
        } = await Axios.post('/api/users/signin', {
            email,
            password
        });
        //So when we get to this line it means the entered email and password are correct and data contains user information and token. So it's time to dipatch user sign in success action. The payload here is the data that the server sends back.
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        //Now we save user data inside localStorage. That's because we want to keep the user signed in even if they close the browser and open it again later.
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        //if there is an error we dispatch user signin failure action we defined earlier in our constants. The payload here checks if any response to the request exists and it includes a message to return that message or otherwise return a general error message 
        dispatch({
            type: USER_SIGNIN_FAILURE,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
};

//Defining signout action 
export const signout = () => async (dispatch) => {
    //we want to remove userInfo from localStorage when we sign out
    localStorage.removeItem('userInfo');
    //we should also remove shopping cart items from localStorage upon user logout
    localStorage.removeItem('cartItems');
    //we also remove shipping address from localStorage upon signing out 
    localStorage.removeItem('shippingAddress');
    dispatch({
        type: USER_SIGNOUT
    });
};

//copy pasting sign in action to create the sign up action
export const signUp = (name, email, password) => async (dispatch) => {
    //First we dispatch user sign-up request. We also have to import the appropriate action at the top. The payload for this request is the email and password entered by the user.
    dispatch({
        type: USER_SIGNUP_REQUEST,
        payload: {
            email,
            password
        }
    })
    //Now we're sending an ajax request and we use try catch technique to catch any potential errors.
    try {
        //sending an ajax request. We use a post request here in our ajax call because the sign-up API works with a post request. The first parameter here is the URL address of the API and the second one is the data we use to send the request.
        const {
            data
        } = await Axios.post('/api/users/signup', {
            name,
            email,
            password
        });
        //So when we get to this line it means the entered name, email and password are successguly stored in database and data contains user information and token. So it's time to dipatch user sign-up success action. The payload here is the data that the server sends back.
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        //we duplicate the dispatch block above and just change its type to user sign in success. We need this to update the redux store based on user sign in because in our app.js file we read user sign in from the state to authenticate user
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        //Now we save user data inside localStorage. That's because we want to keep the user signed in even if they close the browser and open it again later.
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        //if there is an error we dispatch user signin failure action we defined earlier in our constants. The payload here checks if any response to the request exists and it includes a message to return that message or otherwise return a general error message 
        dispatch({
            type: USER_SIGNUP_FAILURE,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
};

export const userDetails = (userId) => async (dispatch, getState) => {
    dispatch({
        type: USER_DETAILS_REQUEST,
        payload: userId
    });
    const {
        signIn: {
            userInfo
        },
    } = getState();
    try {
        const {
            data
        } = await Axios.get(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        });
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message;
        dispatch({
            type: USER_DETAILS_FAILURE,
            payload: message
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
        payload: user
    });
    const {
        signIn: {
            userInfo
        },
    } = getState();
    try {
        const {
            data
        } = await Axios.put(`/api/users/profile`, user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        });
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });
        //here we also have to update user Sign In because we also show username in the navbar menu and that comes from user SignIn action
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        //and we also have to update userInfo in localStorage with the new data
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message;
        dispatch({
            type: USER_UPDATE_PROFILE_FAILURE,
            payload: message
        });
    }
};