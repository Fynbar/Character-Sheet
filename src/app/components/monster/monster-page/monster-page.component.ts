import { Component, OnInit } from '@angular/core';
import { JSONService } from '../../../services/json.service';
import { MonsterMonMan } from '../../../../models/monsters/mon-man-text-monster/monsterMonMan';
import { insertString } from '../../../common/string.functions';
import { abilityAbbrev } from 'src/models/rules/ability.enum';
import { MonsterCreature } from '../../../../models/monsters/final-monster/monsterCreature';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicDialog';
import { MessageService } from 'primeng/api';
import { ModifierBuilderComponent } from '../../modifiers/modifier-builder/modifier-builder.component';

@Component({
  selector: 'app-monster-page',
  templateUrl: './monster-page.component.html',
  styleUrls: ['./monster-page.component.css']
})
export class MonsterPageComponent implements OnInit {
  cols = [
    { field: 'name', header: 'Name' },
    { field: 'challenge', header: 'CR' },
    { field: 'armorClass', header: 'AC' },
  ];
  public monsters: MonsterCreature[];
  public expandedRows = {};
  constructor(
    private jsonService: JSONService, public dialogService: DialogService) { }

  ref: DynamicDialogRef;

  editMonster(rowData, i) {
    // show() {
    this.ref = this.dialogService.open(ModifierBuilderComponent, {
      data: rowData,
      header: 'Choose a Car',
      width: '70%',
      // tslint:disable-next-line:object-literal-key-quotes
      contentStyle: { 'max-height': '350px', 'overflow': 'auto' }
    });

    this.ref.onClose.subscribe((monster: MonsterCreature) => {
      if (monster) {
        this.monsters[i] = monster;
      }
    });
  }

  // ngOnDestroy() {
  //   this.ref.close();
  // }
  // private temp: MonsterMonMan[] = [];


  // ngAfterViewInit() {
  //   this.d1.nativeElement.insertAdjacentHTML('beforeend', '<app-dice [diceType]=12></app-dice> two');
  // }

  ngOnInit() {
    // console.log(data);
    forkJoin(...['monsterManualAdditions',
      'srdMonsterAdditions',
      'voloMonsterAdditions'].map(n => this.jsonService.getJSON(n))).pipe(
        map((d: MonsterCreature[][]) => {
          let s = [];
          d.forEach((element: MonsterCreature[]) => {
            s = s.concat(...element.map(m => new MonsterCreature(m)));
          });
          return s;
        })
      ).subscribe(data => {
        console.log(data);
        this.monsters = data;
        // this.expandedRows[this.monsters[0].name] = true;
      });
  }


  //   console.log(rowData);
  // }
}
