import {Schema, model, Types} from "mongoose"


const MovementSchema = new Schema({
    accountId: {
        type: Types.ObjectId,
        required: true
    },
    movementType: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
})

export default model("movement", MovementSchema, "movement")