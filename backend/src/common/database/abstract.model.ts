import { Model } from 'objection';

class Abstract extends Model {
    public 'id': string;

    public 'created_at': string;

    public 'updated_at': string;

    public override $beforeInsert(): void {
        const insertDate = new Date().toISOString();

        this.created_at = insertDate;
        this.updated_at = insertDate;
    }

    public override $beforeUpdate(): void {
        this.updated_at = new Date().toISOString();
    }
}

export { Abstract };
