import Axios from "axios";
import {
    ITEM_DETAILS_FAILURE,
    ITEM_DETAILS_REQUEST,
    ITEM_DETAILS_SUCCESS,
    ITEM_LIST_FAILURE,
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
} from "../constants/itemConstants";

export const listItems = () => async (dispatch) => {
    dispatch({
        type: ITEM_LIST_REQUEST,
    });
    try {
        const {
            data
        } = await Axios.get("/api/items");
        dispatch({
            type: ITEM_LIST_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: ITEM_LIST_FAILURE,
            payload: err.message,
        });
    }
};

export const getItemDetails = (itemID) => async (dispatch) => {
    dispatch({
        type: ITEM_DETAILS_REQUEST,
        payload: itemID,
    });
    try {
        const {
            data
        } = await Axios.get(`/api/items/${itemID}`);
        dispatch({
            type: ITEM_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: ITEM_DETAILS_FAILURE,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
};