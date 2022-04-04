import {IBalanceRepository} from "../../repositories/IBalanceRepository"
import {GetBalanceRequestDTO} from "./GetBalanceDTO"

export class GetBalanceUseCase {
    constructor(
        // eslint-disable-next-line no-unused-vars
        private balanceRepository: IBalanceRepository
    ) {}

    async execute(data: GetBalanceRequestDTO) {
        return await this.balanceRepository.getBalance(data.cpf)
    }
}