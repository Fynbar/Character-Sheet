import { Component, OnInit, Input } from '@angular/core';
import { Die } from './dice';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})

export class DiceComponent extends Die implements OnInit {
  @Input() constant = 0;
  @Input() diceType = 4;
  @Input() diceNum = 1;
  @Input() dice: Die;
  diceRoll: any;
  history = [];
  constructor(private sanitized: DomSanitizer) {
    super();
  }

  ngOnInit() {
    // this.result = this.sanitized.bypassSecurityTrustHtml(this.diceString);
    const comps = ['diceType', 'diceNum', 'constant'];
    if (this.dice) {
      comps.forEach(c => this[c] = this.dice[c]);
    } else {
      this.dice = new Die(...comps.map(c => this[c]));
    }
    // console.log(this.dice);
  }

  public get diceString(): string {
    return this.dice ? this.dice.makeString : '...';
  }

  public rollDice($event): void {
    this.diceRoll = this.dice.roll();
  }

  public closeDiceDialog($event): void {
    this.diceRoll = this.history.push(this.diceRoll);
  }
  public get displayDice() {
    return this.diceRoll ? true : false;
  }

}
