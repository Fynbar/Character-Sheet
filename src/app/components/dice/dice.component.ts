import { Component, OnInit, Input } from '@angular/core';
import { Dice } from './dice';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})

export class DiceComponent extends Dice implements OnInit {
  @Input() constant = 0;
  @Input() diceType = 4;
  @Input() diceNum = 1;
  @Input() dice: Dice;
  constructor() { super(); }

  ngOnInit() {
    const comps = ['diceType', 'diceNum', 'constant'];
    if (this.dice) {
      comps.forEach(c => this[c] = this.dice[c]);
    } else {
      this.dice = new Dice(...comps.map(c => this[c]));
    }
  }
}
