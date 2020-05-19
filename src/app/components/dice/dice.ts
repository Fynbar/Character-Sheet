export class Dice {
    constant = 0;
    diceType = 4;
    diceNum = 1;
    constructor(diceType?: number, diceNum?: number, constant?: number) {
        this.constant = constant;
        this.diceType = diceType;
        this.diceNum = diceNum;
    }
    public get avg(): number {
        const diceAVG = this.diceNum * (this.diceType + 1) / 2;
        return this.constant + Math.floor(diceAVG);
    }
    public get makeString(): string {
        let conMod = '';
        if (this.constant > 0) {
            conMod = `+${this.constant}`;
        } else if (this.constant < 0) {
            conMod = `${this.constant}`;
        }
        return `${this.avg} (${this.diceNum}d${this.diceType}${conMod})`;
    }

    public roll(): Roll {
        const Rolls = [];
        for (let i = 0; i < this.diceNum; i++) {
            Rolls[i] = this.constant + Math.ceil(Math.random() * this.diceType);
        }
        return {
            rolls: Rolls,
            total: Rolls.reduce((sum, roll) => sum + roll, 0)
        };
    }

}

export interface Roll {
    rolls: number[];
    total: number;
}
