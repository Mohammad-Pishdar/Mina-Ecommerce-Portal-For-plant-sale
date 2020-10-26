import Axios from "axios";
import {
    ITEM_CREATE_FAILURE,
    ITEM_CREATE_REQUEST,
    ITEM_CREATE_SUCCESS,
    ITEM_DETAILS_FAILURE,
    ITEM_DETAILS_REQUEST,
    ITEM_DETAILS_SUCCESS,
    ITEM_LIST_FAILURE,
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
    ITEM_UPDATE_REQUEST,
    ITEM_UPDATE_SUCCESS,
    ITEM_UPDATE_FAILURE,
    ITEM_DELETE_REQUEST,
    ITEM_DELETE_SUCCESS,
    ITEM_DELETE_FAILURE,
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

export const createItem = () => async (dispatch, getState) => {
    dispatch({
        type: ITEM_CREATE_REQUEST
    });
    const {
        signIn: {
            userInfo
        },
    } = getState();
    try {
        const {
            data
        } = await Axios.post(
            '/api/items',
            //it doesn't accept any data as payload so it's an empty object
            {}, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                },
            }
        );
        dispatch({
            type: ITEM_CREATE_SUCCESS,
            payload: data.item,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message;
        dispatch({
            type: ITEM_CREATE_FAILURE,
            payload: message
        });
    }
};

export const updateItem = (item) => async (dispatch, getState) => {
    dispatch({
        type: ITEM_UPDATE_REQUEST,
        payload: item
    });
    const {
        signIn: {
            userInfo
        },
    } = getState();
    try {
        const {
            data
        } = await Axios.put(`/api/items/${item._id}`, item, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        });
        dispatch({
            type: ITEM_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message;
        dispatch({
            type: ITEM_UPDATE_FAILURE,
            error: message
        });
    }
};

export const deleteItem = (itemId) => async (dispatch, getState) => {
    dispatch({ type: ITEM_DELETE_REQUEST, payload: itemId });
    const {
      signIn: { userInfo },
    } = getState();
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = Axios.delete(`/api/items/${itemId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: ITEM_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ITEM_DELETE_FAILURE, payload: message });
    }
  };