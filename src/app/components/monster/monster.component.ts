import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent implements OnInit {

  constructor() { }
  public buttonstring = '<app-dice diceType=12><br/></app-dice>';
  public string2 = '<p-button label="cabbage"></p-button>';

  ngOnInit() {

  }

}
