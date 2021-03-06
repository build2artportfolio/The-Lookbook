import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  GET_USER_POSTS_SUCCESS,
  CREATE_POST_SUCCESS,
  CREATE_ERROR,
  SET_EDIT,
  EDIT_ERROR,
  DELETE_SUCCESS,
  CLEAR_TOP_MESSAGE,
  CLEAR_USER,
  SAVE_USER_INFO
} from "../actions";

const initialState = {
  currentUser: {},
  currentUserInfo: {},
  currentUserPosts: [],
  currentPost: {},
  topMessage: '',
  errorMessage: '',
  loginspinner: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loginspinner: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      };
    case LOGIN_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        loginspinner: false
      };
    case SIGNUP_START:
      return {
        ...state,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        topMessage: action.payload
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        currentUserPosts: action.payload,
        loginspinner: false
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state
      };
    case CREATE_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case SET_EDIT:
      return {
        ...state,
        currentPost: action.payload
      };
    case EDIT_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        topMessage: action.payload
      };
    case CLEAR_TOP_MESSAGE:
      return {
        ...state,
        topMessage: '',
        errorMessage: ''
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: {}
      };
    case SAVE_USER_INFO:
      return {
        ...state,
        currentUserInfo: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
