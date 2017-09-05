import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3090';

export const signinUser = ({ email, password }) => async dispatch => {
  try {
    const response = await axios.post(`${ROOT_URL}/signin`, { email, password });

    if (response.data) {
      dispatch({ type: AUTH_USER });

      localStorage.setItem('token', response.data.token);

      browserHistory.push('/feature');
    }
  } catch(err) {

  }
};
