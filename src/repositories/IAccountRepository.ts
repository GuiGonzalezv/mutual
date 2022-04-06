/* eslint-disable no-unused-vars */
import {Account} from "../entities/Account"

export interface IAccountRepository {
    findByCpf(cpf: string): Promise<Account>;
    save(data: Account) : Promise<Account>;
}