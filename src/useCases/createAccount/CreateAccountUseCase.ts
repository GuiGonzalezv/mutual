
import {BadRequest} from "http-errors"
import {Account} from "../../entities/Account"
import {IAccountRepository} from "../../repositories/IAccountRepository"
import {CreateAccountRequestDTO} from "./CreateAccountDTO"

export class CreateAccountUseCase {

    constructor(
        // eslint-disable-next-line no-unused-vars
        private accountRepository: IAccountRepository
    ) {}
    async execute(data: CreateAccountRequestDTO) {
        const accountAlreadyExist = await this.accountRepository.findByCpf(data.cpf)

        if (accountAlreadyExist) {
            throw new BadRequest("Account already exist.")
        }

        const account = new Account(data)

        return await this.accountRepository.save(account)
    }
}

