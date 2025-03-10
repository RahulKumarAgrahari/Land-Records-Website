import Official from "../models/official.model.js";

export const createOfficial = async (req, res) => {
    //   try {
    //     const newOfficial = await Official.create(req.body);
    //     res.json({ message: "Official created successfully", status: true, data: newOfficial });
    //   } catch (error) {
    //     res.status(500).json({ message: "Error creating official", error: error.message });
    //   }

    const body = req.body
    try {
        console.log(body)
        const userData = await Official.create(body)
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
