import $ from 'jquery';

export const UPDATE_USER = 'users:updateUser';
export const SHOW_ERROR = 'users:showError';

export const updateUser = (newUser) => {
    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    }
};

export const showError = () => {
    return {
        type: SHOW_ERROR,
        payload: {
            user: "ERROR!!!"
        }
    }
};

// thunk will handle our returned callback ( the returned function OF apiRequest() ) to actually fire up our http request. When the action is fired, it will hand back our callback which will be called by thunk to initiate the http request.
// apiRequest :: () => dispatch =>
export const apiRequest = () => {
    return dispatch => {
        console.log("dispatch : ", dispatch);
        $.ajax({
            url: 'https://www.google.com',
            crossDomain: true,
            headers: {  'Access-Control-Allow-Origin': 'https://www.google.com' },
            dataType: 'jsonp'
        })
            .done((resp) => {
                console.log("SUCCESS", resp);
                dispatch(updateUser(resp))
            })
            .fail(() => {
                console.log("ERROR");
                dispatch(showError())
            })
    }
};