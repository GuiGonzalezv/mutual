import {Schema, model} from "mongoose"

const AccountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
})

export default model("account", AccountSchema, "account")