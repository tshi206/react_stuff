import {FETCH_POST, NEW_POST} from "../actions/TYPES";

const initialState = {
    items: [],
    item: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POST:
            return {
                ...state,
                items: action.payload
            };
        case NEW_POST:
            return {
                ...state,
                item: action.payload
            };
        default:
            return state
    }
}