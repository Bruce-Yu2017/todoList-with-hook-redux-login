import { CHECK_VALID_LOGIN } from "../actions/types";

const initialState = {isValid: false, msg: '', type: ''};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_VALID_LOGIN:
      return action.payload;
    default:
      return state;
  }
};
