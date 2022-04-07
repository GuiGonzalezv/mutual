export class ErrorHandler {

    async execute(response, err) {
        if (err.name == "ValidationError") {
            const arrayOfErrors = Object.keys(err.errors).map((validationError) => {
                const info = err.errors[validationError]
                return `Validation Error on field "${info.path}",
                expected "${info.kind}" receive "${info.valueType}`
            })

            return response.status(400).send({errors: arrayOfErrors})
        }
        return response.status(err.status || 500).send(err.message || "Unexpected error")
    }
}