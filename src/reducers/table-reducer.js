import { GET_ALL_TODOS, NEW_TODO, DELETE_ROW, EDIT_ROW } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TODOS:
            return action.payload;
        case NEW_TODO:
            return [action.payload, ...state];
        case DELETE_ROW:
            return state.filter((item) => {
                return item.id !== action.payload
            })
        case EDIT_ROW:
            return state.map((item) => {
                return item.id === action.payload.id ? action.payload : item;
            })
        default:
            return state;
    }
}