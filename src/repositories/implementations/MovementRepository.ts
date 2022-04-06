import {Types} from "mongoose"
import AccountSchema from "../../database/schemas/AccountSchema"
import {IMovementRepository} from "../IMovementRepository"
import {Movement} from "../../entities/Movement"
import MovementSchema from "../../database/schemas/MovementSchema"
import {Balance} from "../../entities/Balance"
import {Account} from "../../entities/Account"
import MovementTypeEnum from "../../enums/MovementTypeEnum"
import {InternalServerError} from "http-errors"


export class MovementRepository implements IMovementRepository {

    async save(movement: Movement) : Promise<Movement> {
        return await MovementSchema.create(movement)
    }
    async getDebits(account: Account): Promise<number> {
        const response =  await MovementSchema.aggregate([
            {$match: {accountId: new Types.ObjectId(account.id), movementType: MovementTypeEnum.debito}},
            {$group: {_id: "$accountId", balance: {$sum: "$value"}}}
        ])

        if (!response.length) {
            return 0
        }

        return response[0].balance
    }
    async getCredits(account: Account): Promise<number> {
        const response =  await MovementSchema.aggregate([
            {$match: {accountId: new Types.ObjectId(account.id), movementType: MovementTypeEnum.credito}},
            {$group: {_id: "$accountId", balance: {$sum: "$value"}}}
        ])

        if (!response.length) {
            return 0
        }

        return response[0].balance
    }
}