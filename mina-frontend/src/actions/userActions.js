import Axios from "axios"
import {
    USER_SIGNIN_FAILURE,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS
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
        //Now we save user data inside localStorage. That's because we want to keep the user signed in even if they close the browser and pen it again later.
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        //if there is an error we dispatch user signin failure action we defined earlier in our constants. The payload here checks if any response to the request exists and it includes a message to return that message or otherwise return a general error message 
        dispatch({
            type: USER_SIGNIN_FAILURE,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}