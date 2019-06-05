export default class ApiError extends Error {
    constructor(data) {
        super();
        this.message = data.Message || 'Something went wrong.';
    }
}