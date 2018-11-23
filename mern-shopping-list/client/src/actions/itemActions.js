import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

export const getItems = () => async dispatch => {
    dispatch(setItemsLoading());
    try {
        const res = await axios["get"]("/api/items");
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    } catch (e) {
        console.error(e)
    }
};

export const addItem = item => async dispatch => {
    dispatch(setItemsLoading());
    try {
        const res = await axios["post"]("/api/items", item);
        dispatch({
            type: ADD_ITEM,
            payload: res.data
        })
    } catch (e) {
        console.error(e)
    }
};

export const deleteItem = id => async dispatch => {
    dispatch(setItemsLoading());
    try {
        const res = await axios["delete"](`/api/items/${id}`);
        if (res.data.success) {
            dispatch({
                type: DELETE_ITEM,
                payload: res.data.result._id
            })
        } else {
            console.log(res.data.error)
        }
    } catch (e) {
        console.error(e)
    }
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
};