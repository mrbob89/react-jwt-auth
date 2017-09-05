import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export const signinUser = ({ email, password }) => async dispatch => {
  const user = axios.post(`${ROOT_URL}/signin`, { email, password });
};
