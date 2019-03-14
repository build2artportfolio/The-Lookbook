import axios from 'axios';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const GET_USER_POSTS_SUCCESS = 'GET_USER_POSTS_SUCCESS';

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_ERROR = 'CREATE_ERROR';

export const SET_EDIT = 'SET_EDIT';
export const EDIT_ERROR = 'EDIT_ERROR';

export const DELETE_SUCCESS = 'DELETE_SUCCESS';

export const CLEAR_TOP_MESSAGE = 'CLEAR_TOP_MESSAGE';

export const CLEAR_USER = 'CLEAR_USER';

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios.post('https://thelookbook-api.herokuapp.com/api/auth/login', creds)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
      axios
        .get(`https://thelookbook-api.herokuapp.com/api/users/${res.data.user.id}`)
        .then(res => {
          localStorage.setItem('currentUserID', res.data.id);
          dispatch({ type: GET_USER_POSTS_SUCCESS, payload: res.data.posts });
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    })
    .catch(err => {
      dispatch({ type: LOGIN_ERROR, payload: err.response.data.message });
      setTimeout(() => {dispatch({ type: CLEAR_TOP_MESSAGE })},5000);
    });
};

export const signUp = creds => dispatch => {
  dispatch({ type: SIGNUP_START });
  return axios.post('https://thelookbook-api.herokuapp.com/api/auth/register', creds)
    .then(res => {
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data.message })
      setTimeout(() => {dispatch({ type: CLEAR_TOP_MESSAGE })},5000);
    })
    .catch(err => {
      dispatch({ type: SIGNUP_ERROR, payload: err.response.data.message });
      setTimeout(() => {dispatch({ type: CLEAR_TOP_MESSAGE })},5000);
    });
};

export const getUserPosts = id => dispatch => {
  return axios
    .get(`https://thelookbook-api.herokuapp.com/api/users/${id}`)
    .then(res => {
      dispatch({ type: GET_USER_POSTS_SUCCESS, payload: res.data.posts });
    })
    .catch(err => {
      console.log(err.response.data.message);
    });
};

export const createPost = (info, update) => dispatch => {
  return axios.post('https://thelookbook-api.herokuapp.com/api/posts', info, {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => {
      update(localStorage.getItem('currentUserID'));
    })
    .catch(err => {
      dispatch({ type: CREATE_ERROR, payload: err.response.data.message });
      setTimeout(() => {dispatch({ type: CLEAR_TOP_MESSAGE })},5000);
      if (err.response.data.message === 'Your token has expired. Please log in again.') {
        dispatch({ type: CLEAR_USER });
        localStorage.removeItem('token');
      }
    });
};

export const setEditForm = (post) => {
  return (
    { type: SET_EDIT, payload: post }
  )
};

export const editPost = (post, id, update) => dispatch => {
  axios
    .put(`https://thelookbook-api.herokuapp.com/api/posts/${id}`, {
      title: post.title,
      description: post.description
    },
      {
        headers: { Authorization: localStorage.getItem('token') }
      })
    .then(res => {
      update(localStorage.getItem('currentUserID'));
    })
    .catch(err => {
      dispatch({ type: EDIT_ERROR, payload: err.response.data.message });
      setTimeout(() => {dispatch({ type: CLEAR_TOP_MESSAGE })},5000);
      if (err.response.data.message === 'Your token has expired. Please log in again.') {
        dispatch({ type: CLEAR_USER });
        localStorage.removeItem('token');
      }
    })
};

export const deletePost = (post, update) => dispatch => {
  axios
    .delete(`https://thelookbook-api.herokuapp.com/api/posts/${post.id}`,
      {
        headers: { Authorization: localStorage.getItem('token') }
      })
    .then(res => {
      dispatch({ type: DELETE_SUCCESS, payload: res.data.message });
      setTimeout(() => {dispatch({ type: CLEAR_TOP_MESSAGE })},5000);
      update(localStorage.getItem('currentUserID'));
    })
    .catch(err => {
      dispatch({ type: EDIT_ERROR, payload: err.response.data.message });
      setTimeout(() => {dispatch({ type: CLEAR_TOP_MESSAGE })},5000);
      if (err.response.data.message === 'Your token has expired. Please log in again.') {
        dispatch({ type: CLEAR_USER });
        localStorage.removeItem('token');
      }
    })
};

export const logout = () => {
  localStorage.removeItem('token');
  return (
    { type: CLEAR_USER }
  )
};
