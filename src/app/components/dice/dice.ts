export class Dice {
    constant: number;
    diceType: number;
    diceNum: number;
    constructor(diceType?: number, diceNum?: number, constant?: number) {
        this.constant = constant ? Math.floor(constant) : 0;
        this.diceType = diceType ? Math.floor(diceType) : 4;
        this.diceNum = diceNum ? Math.floor(diceNum) : 1;
    }
    public get avg(): number {
        return this.constant + Math.floor(this.diceNum * (this.diceType + 1) / 2);
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
