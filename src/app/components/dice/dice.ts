export type Dice = Die[];


export class Die {
    constant: number;
    diceType: number;
    diceNum: number;
    // dice: Dice, reroll?: number[], highest?: number, lowest?: number
    constructor(diceType?: number, diceNum?: number, constant?: number) {
        this.constant = constant ? Math.floor(constant) : 0;
        this.diceType = diceType ? Math.floor(diceType) : 4;
        this.diceNum = diceNum ? Math.floor(diceNum) : 1;
    }


    public static RollMany(dice: Dice): Rolls {
        return dice.map(d => d.roll());
    }

    public static fromString(HP: string): Die {
        let d: number[];
        let c: number;
        let hitDice = HP.trim();
        if (hitDice.indexOf('(') >= 0) {
            hitDice = hitDice.substr(hitDice.indexOf('(') + 1);
        }
        if (hitDice.indexOf(')') >= 0) {
            hitDice = hitDice.substr(0, hitDice.indexOf(')'));
        }
        const signs = ['+', '-'];
        if (hitDice.indexOf('+') > 0) {
            const HPs = hitDice.split('+');
            d = HPs[0].split('d').map(e => Number(e.trim()));
            c = (Number(HPs[1].trim()));
        } else if (hitDice.indexOf('-') > 0) {
            const HPs = hitDice.split('-');
            d = HPs[0].split('d').map(e => Number(e.trim()));
            c = -1 * (Number(HPs[1].trim()));
            // console.log(hitDice, d, c);
        } else {
            d = hitDice.split('d').map(e => Number(e));
            c = 0;
        }
        return new Die(d[1], d[0], c);

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
        // console.log(`${this.avg} (${this.diceNum}d${this.diceType}${conMod})`);
        return `${this.avg} (${this.diceNum}d${this.diceType}${conMod})`;
    }

    public roll(): Roll {
        const dieRolls = [];
        for (let i = 0; i < this.diceNum; i++) {
            dieRolls[i] = Math.ceil(Math.random() * this.diceType);
        }
        return {
            rolls: dieRolls,
            total: this.constant + dieRolls.reduce((sum, roll) => sum + roll, 0)
        };
    }
}

export type Rolls = Roll[];

export interface Roll {
    rolls: number[];
    total: number;
    dice?: Die;
}


