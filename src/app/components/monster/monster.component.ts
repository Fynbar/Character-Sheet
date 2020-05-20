import { Component, OnInit } from '@angular/core';
import { Dice } from '../dice/dice';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent implements OnInit {

  constructor() { }
  public buttonstring = `<strong><app-dice diceType=12><br/></app-dice></strong>`;
  public string2 = '{{ 1200 | number }}';
  public dice = new Dice();
  ngOnInit() {

  }

}
