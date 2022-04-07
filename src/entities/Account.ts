export class Account {
    public readonly id: string
    public cpf: string
    public name: string
    public created_at: Date

    constructor(props: Omit<Account, "id" | "created_at">) {
        Object.assign(this, props)
        if (!this.created_at) this.created_at = new Date()
    }
}