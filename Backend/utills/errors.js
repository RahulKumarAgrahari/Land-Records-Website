const catchBockErrorHandler = (err) => {
    let errors = [];
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0]; // Get the field name (e.g., "email")
        errors.push(`The ${field} '${req.body[field]}' is already in use.`);
        res.status(400).json({
            message: 'Validation errors',
            errors,
            status: false
        });
        return
    }
    if (err.name === 'ValidationError') {
        // Collect all validation errors
        const errorMessages = [];
        for (let field in err.errors) {
            errorMessages.push(err.errors[field].message); // Store the error messages
        }

        // Return the errors to the client
        res.status(400).json({
            message: 'Validation errors',
            errors: errorMessages
        });
        return
    }

    // For other errors (e.g., database issues)
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message
    });
}