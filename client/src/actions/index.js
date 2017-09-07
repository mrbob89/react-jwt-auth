import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export const signinUser = ({ email, password }) => async dispatch => {
    try {
        const response = await axios.post(`${ROOT_URL}/signin`, {
            email,
            password
        });

        dispatch({ type: AUTH_USER });

        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
    } catch (err) {
        dispatch(authError('Bad login info'));
    }
};

export const signupUser = ({ email, password }) => async dispatch => {
    try {
        const response = await axios.post(`${ROOT_URL}/signup`, {
            email,
            password
        });

        dispatch({ type: AUTH_USER });

        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
    } catch (err) {
        dispatch(authError(err.response.data.error));
    }
};

export const signoutUser = () => {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
};

export const authError = error => {
    return {
        type: AUTH_ERROR,
        payload: error
    };
};

export const fetchMessage = () => async dispatch => {
    const response = await axios.get(ROOT_URL, {
        headers: { authorization: localStorage.getItem('token') }
    });

    dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
    });
};
