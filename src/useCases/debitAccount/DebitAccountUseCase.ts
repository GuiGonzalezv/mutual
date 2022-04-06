
import {BadRequest} from "http-errors"
import {Movement} from "../../entities/Movement"
import MovementType from "../../enums/MovementTypeEnum"
import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {MovementAccountRequestDTO} from "../common/MovementAccountDTO"
import {GetBalanceUseCase} from "../getBalance/GetBalanceUseCase"

export class DebitAccountUseCase {

    constructor(
        // eslint-disable-next-line no-unused-vars
        private movementRepository: MovementRepository,
        // eslint-disable-next-line no-unused-vars
        private accountRepository: AccountRepository,
        // eslint-disable-next-line no-unused-vars
        private getBalanceUseCase: GetBalanceUseCase


    ) {}
    async execute(data: MovementAccountRequestDTO) {
        const account = await this.accountRepository.findByCpf(data.cpf)

        if (!account) {
            throw new BadRequest("Account to be debited does not exist")
        }

        const response = await this.getBalanceUseCase.execute({cpf: account.cpf})

        if ((response.balance - data.value) < 0) throw new BadRequest("Insufficient balance to carry out this operation")

        const movement = new Movement({
            accountId: account.id,
            movementType: MovementType.debito,
            value: data.value
        })

        return await this.movementRepository.save(movement)
    }
}

