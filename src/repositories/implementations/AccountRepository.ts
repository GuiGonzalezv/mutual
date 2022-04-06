import {Account} from "../../entities/Account"
import {IAccountRepository} from "../IAccountRepository"
import AccountSchema from "../../database/schemas/AccountSchema"


export class AccountRepository implements IAccountRepository {

    async findByCpf(cpf: string) : Promise<Account> {
        return await AccountSchema.findOne({cpf})
    }

    async save(data: Account) : Promise<Account> {
        return await AccountSchema.create(data)
    }
}