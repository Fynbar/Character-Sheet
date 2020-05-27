import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionElement } from 'src/models/monsters/final-monster/monster.model';
import { toRechargeString } from '../to-recharge-string';
import { Attack, SuccessType, ActionDamage, PurpleType, FromType } from 'src/models/monsters/api-monster/apiMonster.model';
import { abilityAbbreviations } from 'src/models/rules/condition.enum';
import { Dice } from 'src/app/components/dice/dice';
import { DropdownItem } from 'primeng/Dropdown/dropdown';
import { SelectItem } from 'primeng/api/selectitem';
import { enumValuesArray } from 'src/app/common/enumKeysArray';

@Component({
  selector: 'app-action-builder',
  templateUrl: './action-builder.component.html',
  styleUrls: ['./action-builder.component.css']
})
export class ActionBuilderComponent implements OnInit {
  @Input() readOnly = true;
  @Input() action: ActionElement;
  @Input() actionNames: string[] = [];
  @Output() updatedActions: EventEmitter<ActionElement> = new EventEmitter();
  damageOrDC: any[] = [];

  attackTypes = [];
  // cities2: any[] = [];
  damage: any = null;
  dc: any = null;
  purpleTypes: SelectItem[] = [
    { label: 'No Restriction', value: null },
    { label: 'Other Restriction', value: 'other restriction' },
    { label: '(X/Day)', value: 'per day' },
    { label: 'On Rest', value: 'recharge after rest' },
    { label: '(Recharge X-6)', value: 'recharge on roll' },
  ];
  choiceTypes: SelectItem[] = [
    { label: 'Select...', value: null },
    { label: 'Ability', value: FromType.Ability },
    { label: 'Magic', value: FromType.Magic },
    { label: 'Melee', value: FromType.Melee },
    { label: 'Ranged', value: FromType.Ranged },
  ];
  constructor() { }

  ngOnInit() {
    this.attackTypes = this.actionNames.map(a => ({ label: a, value: a }));
  }

  toRechargeString(a: ActionElement): string {
    return toRechargeString(a);
  }

  actionClick(a) {
    console.log(a);
  }

  addAttack(idx?: number): void {
    const newAttack: Attack = {
      name: 'New Attack', dc: {
        dcType: abilityAbbreviations.Str,
        dcValue: 10,
        successType: SuccessType.None
      }
    };
    if (idx >= 0) {
      console.log(`Adding new attack after index idx: ${idx}`);
      this.action.attacks = this.action.attacks.concat([newAttack], this.action.attacks.splice(idx));
    } else {
      console.log('Adding new attack');
      this.action.attacks = this.action.attacks.concat(newAttack);
    }
    console.log(this.action.attacks);
  }

  removeAttack(idx: number): void {
    this.action.attacks = this.action.attacks.filter((_, index) => index !== idx);
    console.log(this.action.attacks);
  }

  addDamage(idx?: number): void {
    const newDamage: ActionDamage = {
      damageType: null,
      damageDice: new Dice(),
      choose: 0,
      type: 'damage',
      from: [],
      dc: {
        dcType: abilityAbbreviations.Str,
        dcValue: 10,
        successType: SuccessType.None
      }
    };
    if (idx >= 0) {
      console.log(`Adding new damage after index idx: ${idx}`);
      this.action.damage = this.action.damage.concat([newDamage], this.action.damage.splice(idx));
    } else {
      console.log('Adding new damage');
      this.action.damage = this.action.damage.concat(newDamage);
    }
    console.log(this.action.damage);
  }
  get givenActionNames() {
    return this.actionNames.length > 0;
  }
  get isMultiattack() {
    return this.action.name ? this.action.name === 'Multiattack' : false;
  }

  public addChoice(i, j) {
    console.log(this.action.options.from[i][j]);
    this.action.options.from[i] = this.action.options.from[i].slice(0, j)
      .concat(...[{
        count: 1, name: this.givenActionNames
          ? this.givenActionNames[0] : 'claw', type: FromType.Melee
      }, ...this.action.options.from[i].slice(j)]);
  }

  public removeChoice(i, j): void {
    this.action.options.from[i] = this.action.options.from[i].filter((_, index) => index !== j);
    console.log(this.options);
  }

  public addOption(i) {
    console.log(this.action.options.from[i]);
    this.action.options.from.push([{ count: 1, name: this.givenActionNames ? this.actionNames[0] : 'claw', type: FromType.Melee }]);
  }

  public removeOption(i): void {
    this.action.options.from = this.action.options.from.filter((_, index) => index !== i);
    console.log(this.options);
    // console.log(this.action.attacks);
  }


  typeDropdownChange(event, i, j) {
    console.log(event);
    console.log(this.givenActionNames, this.actionNames, this.attackTypes);
    // console.log(event.value);
    // console.log(event.value.value);
    // this.options.from[i][j].type = event.option.value;
  }

  public get options() {
    return this.action.options;
  }


  public set options(f) {
    console.log(f);
    this.action.options = f;
    this.outputAction();
  }

  private outputAction() {
    this.updatedActions.emit(this.action);
  }

  // removeAttack(idx: number, ): void {
  //   this.action.attacks = this.action.attacks.filter((_, index) => index !== idx);
  //   console.log(this.action.attacks);
  // }


  // addAttack(idx?: number): void {
  //   const newAttack: Attack = {
  //     name: 'New Attack', dc: {
  //       dcType: abilityAbbreviations.Str,
  //       dcValue: 10,
  //       successType: SuccessType.None
  //     }
  //   };
  //   if (idx >= 0) {
  //     console.log(`Adding new attack after index idx: ${idx}`);
  //     this.action.attacks = this.action.attacks.concat([newAttack], this.action.attacks.splice(idx));
  //   } else {
  //     console.log('Adding new attack');
  //     this.action.attacks = this.action.attacks.concat(newAttack);
  //   }
  //   console.log(this.action.attacks);
  // }

  // removeAttack(idx: number, ): void {
  //   this.action.attacks = this.action.attacks.filter((_, index) => index !== idx);
  //   console.log(this.action.attacks);
  // }
}
