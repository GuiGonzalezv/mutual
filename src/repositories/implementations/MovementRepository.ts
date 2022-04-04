import AccountSchema from "../../database/schemas/AccountSchema"
import {IMovementRepository} from "../IMovementRepository"
import {Movement} from "../../entities/Movement"
import MovementSchema from "../../database/schemas/MovementSchema"
import {Balance} from "../../entities/Balance"




export class MovementRepository implements IMovementRepository {

    async debitAccount(movement: Movement) : Promise<void> {
        return await MovementSchema.create(movement)
    }

    async creditAccount(movement: Movement) : Promise<void> {
        return await MovementSchema.create(movement)
    }

    async getBalance(cpf: string): Promise<Balance> {
        return new Balance()
    }

}