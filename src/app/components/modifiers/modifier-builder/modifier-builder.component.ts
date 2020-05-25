import { Component, OnInit } from '@angular/core';
import { MonsterCreature } from 'src/models/monsters/final-monster/monsterCreature';
import { ModifierComponent } from '../modifier/modifier.component';

@Component({
  selector: 'app-modifier-builder',
  templateUrl: './modifier-builder.component.html',
  styleUrls: ['./modifier-builder.component.css']
})
export class ModifierBuilderComponent implements OnInit {
  public modifiedCreature: MonsterCreature;
  public modificationa: ModifierComponent[];

  constructor() { }


  ngOnInit() {

  }

}
