import { NAR_BAR_STATE } from "../actions/types";

const initialState = { isLogin: false, userName: "", id: "" };

export default (state = initialState, action) => {
  switch (action.type) {
    case NAR_BAR_STATE:
      return action.payload;
    default:
      return state;
  }
  
};
