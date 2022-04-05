export class ErrorHandler {

    async execute(response, err) {
        if (err.name == "ValidationError") {
            return response.status(400).send(`
                Validation Error on field "${err.errors.value.path}",
                expected "${err.errors.value.kind}" receive "${err.errors.value.valueType}"`
            )
        }
        return response.status(err.status || 500).send(err.message || "Unexpected error")
    }
}