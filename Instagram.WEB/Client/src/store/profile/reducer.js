import { combineReducers } from 'redux';

import avatar from './reducers/avatar';
import editForm from './reducers/editForm';
import isLoading from './reducers/isLoading';
import isSaving from './reducers/isSaving';
import viewData from './reducers/viewData';
import isDataLoaded from './reducers/isDataLoaded';

export default combineReducers({
    avatar,
    editForm,
    isLoading,
    isSaving,
    viewData,
    isDataLoaded
});