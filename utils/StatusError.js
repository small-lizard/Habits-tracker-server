class StatusError extends Error {
    status = 500;
    message = 'Somethings went wrong...';

    constructor(message, status) {
        super(message);

        this.message = message;

        if (status) {
            this.status = status;
        }
    }
}

module.exports = StatusError;