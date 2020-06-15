import { Component, OnInit, Input } from '@angular/core';
import { Die, Roll } from './dice';
import { DomSanitizer } from '@angular/platform-browser';
import { tap, flatMap } from 'rxjs/operators';
import { PythonService } from 'src/app/services/python.service';

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
  diceRoll: Roll;
  history = [];
  constructor(public service: PythonService) {
    super();
  }

  ngOnInit() {
    // this.result = this.sanitized.bypassSecurityTrustHtml(this.diceString);
    console.log(this);
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
    this.service.rollDice(this.dice).pipe(flatMap(d => {
      this.diceRoll = d;
      console.log(d);
      return this.service.getDiceHistory().pipe(tap(h => console.log(h.reverse())));
    })).subscribe(h =>
      this.history = h
    );
  }

  public closeDiceDialog($event): void {
    this.diceRoll = null;
  }
  public get displayDice() {
    return this.diceRoll ? true : false;
  }

  public get displayDiceRollString() {
    return this.diceRoll ?
      this.diceRoll.rolls.map(n => String(n)).join(this.diceRoll.rolls.length > 1 ? ' + ' : '')
      : '...';
  }

  public get displayDiceTotalString() {
    return this.diceRoll ?
      this.diceRoll.dice.constant !== 0 ?
        `${this.diceRoll.total - this.diceRoll.dice.constant} ${this.diceRoll.dice.constant < 1 ? '-' : '+'
        } ${Math.abs(this.diceRoll.dice.constant)} = ${this.diceRoll.total}`
        : `${this.diceRoll.total}`
      : '...';
  }
}
