import axios from 'axios';

export const login = creds => dispatch => {
  dispatch();
  return axios.post('url', creds).then(res => {
    localStorage.setItem('token', res.data.payload);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.payload });
    axios
      .get('url', {
        headers: { Authorization: localStorage.getItem('token') }
      })
      .then(res => {
        dispatch();
      })
      .catch(err => {
        console.log(err);
      });
  });
};


