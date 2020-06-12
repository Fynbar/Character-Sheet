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
  @Input() modifications: CreatureModifier[] = [];
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
      }
    } else {
      forkJoin(...['monsterManualAdditions',
        'srdMonsterAdditions',
        'voloMonsterAdditions'].map(n => this.jsonService.getJSON(n))).pipe(
          map((d: Monster[][]) => {
            let s = [];
            d.forEach((element: MonsterCreature[]) =>
              s = s.concat(...element) // .map(m => new MonsterCreature(m)));
            );
            return s;
          })
        ).subscribe(data => {
          console.log(data.filter(f => !f.isComplete));
          this.options = data;
        });
    }

    // console.log(this.config.data);
    // console.log(this.ref);
  }

  // public get

}
