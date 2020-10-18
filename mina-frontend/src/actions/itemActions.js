import Axios from "axios";
import { ITEM_LIST_FAILURE, ITEM_LIST_REQUEST, ITEM_LIST_SUCCESS } from "../constants/itemConstants"

export const listItems = () => async (dispatch) => {
    dispatch({ 
        type: ITEM_LIST_REQUEST
    });
    try {
        const {data} = await Axios.get('/api/items');
        dispatch({
            type: ITEM_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: ITEM_LIST_FAILURE,
            payload: err.message
        })
    }
}