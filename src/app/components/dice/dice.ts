export class Dice {
    constant: number;
    diceType: number;
    diceNum: number;
    constructor(diceType?: number, diceNum?: number, constant?: number) {
        this.constant = constant ? Math.floor(constant) : 0;
        this.diceType = diceType ? Math.floor(diceType) : 4;
        this.diceNum = diceNum ? Math.floor(diceNum) : 1;
    }

    public static fromString(HP: string): Dice {
        let d: number[];
        let c: number;
        if (HP.indexOf('+') > 0 || HP.indexOf('-') > 0) {
            const HPs = HP.split(' ');
            d = HPs[0].split('d').map(e => Number(e));
            c = HPs[1] === '+' ? Number(HPs[2]) : -1 * (Number(HPs[2]));
        } else {
            d = HP.split('d').map(e => Number(e));
            c = 0;
        }
        return new Dice(d[1], d[0], c);

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
            Rolls[i] = Math.ceil(Math.random() * this.diceType);
        }
        return {
            rolls: Rolls,
            total: this.constant + Rolls.reduce((sum, roll) => sum + roll, 0)
        };
    }

}

export interface Roll {
    rolls: number[];
    total: number;
}
