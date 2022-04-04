export class Movement {
    public readonly id: string
    public accountId: string
    public movementType: number
    public value: number
    public created_at: Date

    constructor(props: Omit<Movement, "id" | "created_at">, id?: string) {
        Object.assign(this, props)
        if (id) this.id = id
        this.created_at = new Date()
    }
}