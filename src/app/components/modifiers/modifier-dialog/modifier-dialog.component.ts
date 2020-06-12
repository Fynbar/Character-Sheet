import { Component, OnInit } from '@angular/core';
import { MonsterCreature } from 'src/models/monsters/final-monster/monsterCreature';
import { ModifiedMonster, CreatureModifier } from '../modifier/modifier.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';


@Component({
  selector: 'app-modifier-dialog',
  templateUrl: './modifier-dialog.component.html',
  styleUrls: ['./modifier-dialog.component.css']
})
export class ModifierDialogComponent implements OnInit {

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

  public get showable() {
      return this.modifications && this.modifiedCreature;
  }
  // public get

}
