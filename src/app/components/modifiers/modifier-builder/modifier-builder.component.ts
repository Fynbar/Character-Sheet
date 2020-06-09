import { Component, OnInit } from '@angular/core';
import { MonsterCreature } from 'src/models/monsters/final-monster/monsterCreature';
import { ModifiedMonster, CreatureModifier } from '../modifier/modifier.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicDialog';

@Component({
  selector: 'app-modifier-builder',
  templateUrl: './modifier-builder.component.html',
  styleUrls: ['./modifier-builder.component.css']
})
export class ModifierBuilderComponent implements OnInit {
  public modifiedCreature: ModifiedMonster;
  public modifications: CreatureModifier[];
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    if (this.config.data.modifications) {
      this.modifiedCreature = this.config.data.modifiedCreature;
      this.modifications = this.config.data.modifications;
    } else {
      // this.modifiedCreature = this.config.data;
      this.modifications = [];
      this.modifiedCreature = new ModifiedMonster(this.config.data);
    }
    // console.log(this.config.data);
    // console.log(this.ref);
  }

  selectCar() {
    this.ref.close();
  }

  // public get

}
