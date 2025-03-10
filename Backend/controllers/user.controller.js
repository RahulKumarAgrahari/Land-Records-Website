
const loginUser = async (req, res) => {
    console.log(req)
    const body = req.body
    console.log("here")
    try {
        console.log("body",body)
        // const userData = await Official.create(body)
        res.send({
            message: "Official Created Successfuly",
            status: true
        })
    } catch (err) {

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
};


export {
    loginUser
}