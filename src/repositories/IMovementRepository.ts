import {Balance} from "../entities/Balance"
import {Movement} from "../entities/Movement"

/* eslint-disable no-unused-vars */
export interface IMovementRepository {
    debitAccount(movement: Movement) : Promise<void>;
    creditAccount(movement: Movement) : Promise<void>;
    getBalance(cpf: string) : Promise<Balance>;
}