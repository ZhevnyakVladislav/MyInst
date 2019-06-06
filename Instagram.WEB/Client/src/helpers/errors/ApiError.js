export default class ApiError extends Error {
    constructor(response) {
        super();
        this.message = response.data.Message || 'Something went wrong.';
    }
}