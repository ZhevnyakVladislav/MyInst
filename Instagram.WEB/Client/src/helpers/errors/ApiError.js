import { userUnauthorized } from '../../store/user/actions';
import { showAlert } from '../../store/alert/actions';
import globalDispatch from '../dispatch';

export default class ApiError extends Error {
    constructor(error) {
        super();
        const response = error.response;

        if (!!response && response.status) {
            if (response.status === 401) {
                globalDispatch(userUnauthorized());
            }
            this.code = response.status;
            this.message = response.data.Message;
        } else {
            this.message = 'Something went wrong.';
        }

        globalDispatch(showAlert(this.message));

        throw error;
    }
}