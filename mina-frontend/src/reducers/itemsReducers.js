const { ITEM_LIST_REQUEST, ITEM_LIST_SUCCESS, ITEM_LIST_FAILURE } = require("../constants/itemConstants")

export const itemListReducer = (state = { items: [], loading:true }, action) => {
    switch (action.type) {
        case ITEM_LIST_REQUEST:
            return {loading: true};
        case ITEM_LIST_SUCCESS:
            return {loading: false, items: action.payload};
        case ITEM_LIST_FAILURE:
            return {loading: false, err: action.payload};
        default:
            return state;
    }
}