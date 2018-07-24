import {SHOW_ERROR, UPDATE_USER} from "../actions/user-actions";

const userReducer = (state = "", { type, payload } ) => {
    switch (type) {
        case UPDATE_USER:
            return payload.user;
        case SHOW_ERROR:
            return payload.user;
        default:
            return state;
    }
};
export default userReducer;