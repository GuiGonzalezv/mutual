
import {BadRequest} from "http-errors"
import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {CreditAccountUseCase} from "../creditAccount/CreditAccountUseCase"
import {DebitAccountUseCase} from "../debitAccount/DebitAccountUseCase"
import {TransferBetweenAccountsRequestDTO} from "./TransferBetweenAccountsDTO"

export class TransferBetweenAccountsUseCase {

    constructor(

        // eslint-disable-next-line no-unused-vars
        private debitAccountUseCase: DebitAccountUseCase,
        // eslint-disable-next-line no-unused-vars
        private creditAccountUseCase: CreditAccountUseCase,
        // eslint-disable-next-line no-unused-vars
        private accountRepository: AccountRepository

    ) {}

    async execute(data: TransferBetweenAccountsRequestDTO) {
        // Checks if the account to be sent exists, to handle the error if the debit is made and when credited,
        // there is no other account
        const toAccount = await this.accountRepository.findByCpf(data.toCpf)

        if (!toAccount) throw new BadRequest("Account to be credited does not exist")

        await this.debitAccountUseCase.execute({cpf: data.fromCpf, value: data.value})
        await this.creditAccountUseCase.execute({cpf: data.toCpf, value: data.value})

    }
}

