export class AffairBox {
    constructor(
        id: string,
        color: string
    ) {}

    toJSON() {
        return {
            ...this,
        }
    }

    static fromJSON(json: any): AffairBox {
        return new AffairBox(
            json.id,
            json.color
        );
    }
};

export function parseAffairBox(json: any): AffairBox {
    return AffairBox.fromJSON(json);
}
