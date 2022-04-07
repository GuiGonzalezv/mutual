export class Movement {
    public readonly id: string
    public accountId: string
    public movementType: number
    public value: number
    public created_at: Date

    constructor(props: Omit<Movement, "id" | "created_at">) {
        Object.assign(this, props)
        if (!this.created_at) this.created_at = new Date()
    }
}