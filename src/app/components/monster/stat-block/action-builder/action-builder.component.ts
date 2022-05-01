import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionElement } from '../../../../../models/monsters/final-monster/monster.model';
import { toRechargeString } from '../to-recharge-string';
import { Attack, SuccessType, ActionDamage, PurpleType, FromType } from '../../../../../models/monsters/api-monster/apiMonster.model';
import { abilityAbbreviations } from '../../../../../models/rules/condition.enum';
import { Die } from '../../../dice/dice';
import { DropdownItem } from 'primeng/dropdown/dropdown';
import { SelectItem } from 'primeng/api/selectitem';
import { enumValuesArray } from '../../../../../app/common/enumKeysArray';
import { WeaponAttack } from '../../../equipment/weapon/weapon-attack';
import { Weapon, CategoryRange } from '../../../../../models/equipment/weapon.model';
import { JSONService } from '../../../../services/json.service';

const categoryRanges = enumValuesArray(CategoryRange);
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
  outputAction: ActionElement = null;
  public expandedRows = {};
  public weapons: { label: string, items: { label: string, value: Weapon }[] }[];

  public givenActionNames = false;
  purpleTypes: SelectItem[] = [
    { label: 'No Restriction', value: null },
    { label: 'Other Restriction', value: PurpleType.other },
    { label: '(X/Day)', value: PurpleType.PerDay },
    { label: 'On Rest', value: PurpleType.RechargeAfterREST },
    { label: '(Recharge X-6)', value: PurpleType.RechargeOnRoll },
  ];
  choiceTypes: SelectItem[] = [
    { label: 'Select...', value: null },
    { label: 'Ability', value: FromType.Ability },
    { label: 'Magic', value: FromType.Magic },
    { label: 'Melee', value: FromType.Melee },
    { label: 'Ranged', value: FromType.Ranged },
  ];
  // private multAttack: ActionElement = {

  // };
  constructor(public jsonService: JSONService) { }

  public get show() {
    let s = this.outputAction ? true : false;
    if (this.isWeaponAttack) {
      s = this.weapons ? s : false;
      // } else if () {
      // } else {
    }
    return s;
  }

  ngOnInit() {
    const oa = this.action;
    this.attackTypes = this.actionNames.map(a => ({ label: a, value: a }));
    this.givenActionNames = this.actionNames.length > 0;
    this.jsonService.getWeaponListOrganized().subscribe(w => this.weapons = w);
    // if (oa.name.toLowerCase() === 'multiattack') {
    //   oa.name = 'Multiattack';
    //   if (oa.options) {
    //     if (oa.options.from[0].length === 0) {
    //       this.addChoice(0, 0);
    //     }
    //   } else {
    //     oa.options = { choose: 1, from: [] };
    //     this.addOption(0);
    //   }
    // }
    // console.log(oa);
    this.outputAction = oa;
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
      this.outputAction.attacks = this.outputAction.attacks.concat([newAttack], this.outputAction.attacks.splice(idx));
    } else {
      console.log('Adding new attack');
      this.outputAction.attacks = this.outputAction.attacks.concat(newAttack);
    }
    console.log(this.outputAction.attacks);
  }

  removeAttack(idx: number): void {
    this.outputAction.attacks = this.outputAction.attacks.filter((_, index) => index !== idx);
    console.log(this.outputAction.attacks);
  }

  addDamage(idx?: number): void {
    const newDamage: ActionDamage = {
      damageType: null,
      damageDice: new Die(),
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
      this.outputAction.damage = this.outputAction.damage.concat([newDamage], this.outputAction.damage.splice(idx));
    } else {
      console.log('Adding new damage');
      this.outputAction.damage = this.outputAction.damage.concat(newDamage);
    }
    console.log(this.outputAction.damage);
  }

  public addChoice(i, j) {
    console.log(this.outputAction.options.from[i][j]);
    this.outputAction.options.from[i] = this.outputAction.options.from[i].slice(0, j)
      .concat(...[{
        count: 1, name: this.givenActionNames
          ? this.givenActionNames[0] : 'claw', type: FromType.Melee
      }, ...this.outputAction.options.from[i].slice(j)]);
  }

  public removeChoice(i, j): void {
    this.outputAction.options.from[i] = this.outputAction.options.from[i].filter((_, index) => index !== j);
    console.log(this.options);
  }

  public addOption(i) {
    console.log(this.outputAction.options.from[i]);
    this.outputAction.options.from.push([{ count: 1, name: this.givenActionNames ? this.actionNames[0] : 'claw', type: FromType.Melee }]);
  }

  public removeOption(i): void {
    this.outputAction.options.from = this.outputAction.options.from.filter((_, index) => index !== i);
    console.log(this.options);
    // console.log(this.action.attacks);
  }


  typeDropdownChange(event, i, j) {
    console.log(event);
    console.log(this.givenActionNames, this.actionNames, this.attackTypes);
  }

  public get options() {
    return this.outputAction.options ? this.outputAction.options : {
      choose: 1,
      from: [[]]
    };
  }

  public set options(f) {
    console.log(f);
    this.outputAction.options = f;
    this.doOutputAction();
  }

  private doOutputAction() {
    this.updatedActions.emit(this.outputAction);
  }

  public get isWeaponAttack() {
    return this.outputAction instanceof WeaponAttack;
  }

  public get isAttack() {
    return this.outputAction instanceof WeaponAttack;
  }

  get isMultiattack() {
    return this.outputAction.name ? this.outputAction.name === 'Multiattack' : false;
  }

  set isMultiattack(bool) {
    this.outputAction.name = bool ? 'Multiattack' : this.action.name;
  }

  get hasUsageRestriction() {
    return this.outputAction.usage ? true : false;
  }

  set hasUsageRestriction(bool) {
    this.outputAction.usage = bool ? (this.action.usage ? this.action.usage : {
      type: PurpleType.other,
      restrictionsDesc: 'Change restriction type'
    }) : null;
  }

}
