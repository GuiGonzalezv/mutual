import {Account} from "../entities/Account"
import {Movement} from "../entities/Movement"

/* eslint-disable no-unused-vars */
export interface IMovementRepository {
    save(movement: Movement) : Promise<Movement>;
    getDebits(account: Account) : Promise<number>;
    getCredits(account: Account) : Promise<number>;
}