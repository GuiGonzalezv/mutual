export class Balance {
    public cpf: string
    public balance: number

    constructor(props: Balance) {
        Object.assign(this, props)
    }
}