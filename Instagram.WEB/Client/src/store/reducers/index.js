import { combineReducers } from 'redux';
import user from '../user/reducer';
import profile from '../profile/reducer';
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
    router: connectRouter(history),
    user,
    profile
});