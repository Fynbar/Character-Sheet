import { Component, OnInit, Input } from '@angular/core';
import { Dice } from './dice';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dice',
  template: '<span (click)="rollDice($event)" innerHTML="{{diceString}}"></span>',
  styleUrls: ['./dice.component.css']
})

export class DiceComponent extends Dice implements OnInit {
  @Input() constant = 0;
  @Input() diceType = 4;
  @Input() diceNum = 1;
  @Input() dice: Dice;
  result: any;
  constructor(private sanitized: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.result = this.sanitized.bypassSecurityTrustHtml(this.diceString);
    const comps = ['diceType', 'diceNum', 'constant'];
    if (this.dice) {
      comps.forEach(c => this[c] = this.dice[c]);
    } else {
      this.dice = new Dice(...comps.map(c => this[c]));
    }
    // console.log(this.dice);
  }

  public get diceString(): string {
    return this.dice ? this.dice.makeString : '...';
  }

  public rollDice($event): void {
    console.log(this.dice.roll());
  }
}
