import {BadRequest, NotFound} from "http-errors"
import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {GetBalanceRequestDTO} from "./GetBalanceDTO"
import {Balance} from "../../entities/Balance"


export class GetBalanceUseCase {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private movementRepository: MovementRepository,
        // eslint-disable-next-line no-unused-vars
        private accountRepository: AccountRepository,
    ) {}

    async execute(data: GetBalanceRequestDTO) {
        const account = await this.accountRepository.findByCpf(data.cpf)

        if (!account) throw new NotFound("Account not found.")

        const debits = await this.movementRepository.getDebits(account)
        const credits = await this.movementRepository.getCredits(account)

        const balance = credits - debits

        return new Balance({cpf: account.cpf, balance: balance})
    }
}