import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from '../user/reducer';
import profile from '../profile/reducer';
import alert from '../alert/reducer';
import posts from '../posts/reducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    user,
    profile,
    alert,
    posts
});