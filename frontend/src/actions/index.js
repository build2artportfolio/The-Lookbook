import axios from 'axios';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const GET_USER_POSTS_SUCCESS = 'GET_USER_POSTS_SUCCESS';

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios.post('https://thelookbook-api.herokuapp.com/api/auth/login', creds)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
      axios
        .get(`https://thelookbook-api.herokuapp.com/api/users/${res.data.user.id}`, {
          headers: { Authorization: localStorage.getItem('token') }
        })
        .then(res => {
          localStorage.setItem('currentUserID', res.data.id);
          dispatch({ type: GET_USER_POSTS_SUCCESS, payload: res.data.posts });
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    })
    .catch(err => {
      console.log(err.response.data.message);
      dispatch({ type: LOGIN_ERROR, payload: err.response.data.message });
    });
};

export const signUp = creds => dispatch => {
  dispatch({ type: SIGNUP_START });
  return axios.post('https://thelookbook-api.herokuapp.com/api/auth/register', creds)
    .then(res => {
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data.message })
    })
    .catch(err => {
      console.log(err.response.data.message);
      dispatch({ type: SIGNUP_ERROR, payload: err.response.data.message });
    });
};

export const getUserPosts = id => dispatch => {
  return axios
    .get(`https://thelookbook-api.herokuapp.com/api/users/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(res => {
      dispatch({ type: GET_USER_POSTS_SUCCESS, payload: res.data.posts });
    })
    .catch(err => {
      console.log(err.response.data.message);
    });
};

export const createPost = info => dispatch => {
  return axios.post('https://thelookbook-api.herokuapp.com/api/posts', info, {
    headers: { Authorization: localStorage.getItem('token') }})
    .then(res => {
      dispatch({ type: CREATE_POST_SUCCESS })
    })
    .catch(err => {
      console.log(err.response.data.message);
    });
};



