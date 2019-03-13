import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  GET_USER_POSTS_SUCCESS,
  CREATE_POST_SUCCESS
} from "../actions";

const initialState = {
  currentUser: null,
  currentUserPosts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SIGNUP_START:
      return {
        ...state,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupmessage: action.payload
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signupmessage: action.payload
      };
    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        currentUserPosts: action.payload
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
