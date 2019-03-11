import axios from 'axios';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios.post('https://thelookbook-api.herokuapp.com/api/auth/login', creds)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      // dispatch({ type: LOGIN_SUCCESS, payload: });
      // axios
      //   .get('url', {
      //     headers: { Authorization: localStorage.getItem('token') }
      //   })
      //   .then(res => {
      //     dispatch();
      //   })
      //   .catch(err => {
      //     console.log(err.message);
      //   });
    })
    .catch(err => {
      console.log(err.response.data.message);
      dispatch({ type: LOGIN_ERROR, payload: err.response.data.message});
    });
};

