import { Component, OnInit, Input } from '@angular/core';
import { MonsterCreature } from 'src/models/monsters/final-monster/monsterCreature';
import { ModifiedMonster, CreatureModifier } from '../modifier/modifier.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Monster } from 'src/models/monsters/final-monster/monster.model';
import { JSONService } from 'src/app/services/json.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
// import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';


@Component({
  selector: 'app-modifier-builder',
  templateUrl: './modifier-builder.component.html',
  styleUrls: ['./modifier-builder.component.css']
})
export class ModifierBuilderComponent implements OnInit {
  @Input() modifiedCreature: ModifiedMonster;
  @Input() inputModifications: CreatureModifier[] = [];
  @Input() Monster: Monster;
  @Input() inDialog = false;
  options = [];
  constructor(
    private jsonService: JSONService) { }

  ngOnInit() {
    if (this.inDialog) {
      if (!this.modifiedCreature && this.Monster) {
        this.modifiedCreature = ModifiedMonster.FromMonster(this.Monster);
      } else if (this.modifiedCreature && !this.Monster) {
        this.Monster = this.modifiedCreature;
        // this.modifications = this.modifiedCreature.modifications;
      }
    } else {
      forkJoin(...['monsterManualAdditions', 'srdMonsterAdditions', 'voloMonsterAdditions'].map(n => this.jsonService.getJSON(n))).pipe(
        map((d: Monster[][]) => {
          let s = [];
          d.forEach((element: MonsterCreature[]) => s = s.concat(...element));
          return s;
        })
      ).subscribe(data => {
        console.log(data.filter(f => !f.isComplete));
        this.options = data;
      });
    }
    if (this.inputModifications) {
      this.modifiedCreature.modifications = this.inputModifications;
    }

    // console.log(this.config.data);
    // console.log(this.ref);
  }

  public get modifications() {
    return this.modifiedCreature.modifications;
  }
  public setNewMonster(event) {
    console.log(event.value, this.Monster);
    this.modifiedCreature = ModifiedMonster.FromMonster(this.Monster);
    this.modifiedCreature.name = 'Larry';
  }
  // public get

}
