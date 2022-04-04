
import {BadRequest} from "http-errors"
import {Movement} from "../../entities/Movement"
import MovementType from "../../enums/MovementTypeEnum"
import {AccountRepository} from "../../repositories/implementations/AccountRepository"
import {MovementRepository} from "../../repositories/implementations/MovementRepository"
import {MovementAccountRequestDTO} from "../common/MovementAccountDTO"

export class CreditAccountUseCase {

    constructor(
        // eslint-disable-next-line no-unused-vars
        private movementRepository: MovementRepository,
        // eslint-disable-next-line no-unused-vars
        private accountRepository: AccountRepository

    ) {}
    async execute(data: MovementAccountRequestDTO) {
        const account = await this.accountRepository.findByCpf(data.cpf)

        if (!account) {
            throw new BadRequest("Account not found.")
        }

        const movement = new Movement({
            accountId: account.id,
            movementType: MovementType.credito,
            value: data.value
        })

        await this.movementRepository.creditAccount(movement)
    }
}

