export class Balance {
    public readonly _id: string
    public cpf: string
    public saldo: number

    constructor(props: Balance) {
        Object.assign(this, props)
    }
}