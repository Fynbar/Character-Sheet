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
    public get toString(): string {
        let conMod = '';
        if (this.constant > 0) {
            conMod = '+ ' + this.constant.toString;
        } else if (this.constant < 0) {
            conMod = '- ' + this.constant.toString;
        }
        return this.avg.toString + ' (' + this.diceNum.toString + 'd' + this.diceType.toString + conMod + ')';
    }
}
