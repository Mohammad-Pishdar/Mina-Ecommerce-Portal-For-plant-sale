const {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAILURE,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAILURE,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_FAILURE,
  ITEM_CREATE_RESET,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAILURE,
  ITEM_UPDATE_RESET,
} = require("../constants/itemConstants");

export const itemListReducer = (
  state = {
    items: [],
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return {
        loading: true,
      };
    case ITEM_LIST_SUCCESS:
      return {
        loading: false,
        items: action.payload,
      };
    case ITEM_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const itemDetailsReducer = (
  state = {
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case ITEM_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case ITEM_DETAILS_SUCCESS:
      return {
        loading: false,
        item: action.payload,
      };
    case ITEM_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ItemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ITEM_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        item: action.payload,
      };
    case ITEM_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case ITEM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const itemUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_UPDATE_REQUEST:
      return { loading: true };
    case ITEM_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ITEM_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    case ITEM_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
