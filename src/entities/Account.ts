export class Account {
    public readonly id: string
    public cpf: string
    public name: string
    public created_at: Date

    constructor(props: Omit<Account, "id" | "created_at">, id?: string, created_at?: Date) {
        Object.assign(this, props)
        if (id) this.id = id
        if (!created_at) this.created_at = new Date()
    }
}