import { combineReducers } from 'redux';

import avatar from './reducers/avatar';
import editForm from './reducers/editForm';
import isLoading from './reducers/isLoading';
import isSaving from './reducers/isSaving';
import viewData from './reducers/viewData';
import followers from './reducers/followers';
import following from './reducers/following';
import unfollowModal from './reducers/unfollowModal';

export default combineReducers({
    avatar,
    editForm,
    isLoading,
    isSaving,
    viewData,
    followers,
    following,
    unfollowModal
});