import {Account} from "../entities/Account"
import {Balance} from "../entities/Balance"
import {Movement} from "../entities/Movement"

/* eslint-disable no-unused-vars */
export interface IMovementRepository {
    save(movement: Movement) : Promise<void>;
    getDebits(account: Account) : Promise<number>;
    getCredits(account: Account) : Promise<number>;
}