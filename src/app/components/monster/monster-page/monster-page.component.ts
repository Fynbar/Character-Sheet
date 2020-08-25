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
import { ModifierDialogComponent } from '../../modifiers/modifier-dialog/modifier-dialog.component';
import { ChallengeRating } from 'src/models/rules/challengeRating.enum';

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
  public checked = false;
  public categories = [{ label: 'All Challenge Ratings', value: null }]
    .concat(...Object.keys(ChallengeRating.challengeRating)
      .map(ec => ({ label: ec, value: ec })));

  constructor(
    private jsonService: JSONService, public dialogService: DialogService) { }

  ref: DynamicDialogRef;

  editMonster(rowData: MonsterCreature, i: number) {
    // show() {
    this.ref = this.dialogService.open(ModifierDialogComponent, {
      data: rowData,
      header: `Modify ${rowData.name}`,
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
    this.jsonService.getAllMonsters().pipe(
      map(ms => ms.map(m => new MonsterCreature(m))))
      .subscribe(data => {
        console.log(data.filter(f => !f.isComplete));
        this.monsters = data.filter(f => !f.isComplete).concat(data.filter(f => f.isComplete));

        // this.expandedRows[this.monsters[0].name] = true;
      });
  }

  testFunc(event, dt) {
    console.log(event);
    dt.filter(event.value, 'isComplete', 'equals');
  }
  //   console.log(rowData);
  // }

  get allExpanded(): boolean {
    return this.monsters ? this.monsters.every(e => this.expandedRows[e.name] ? true : false) : false;
  }

  public expandAllRows() {
    if (!this.allExpanded) {
      this.monsters.forEach(e => this.expandedRows[e.name] = true);
    } else {
      this.expandedRows = {};
    }
  }
}
