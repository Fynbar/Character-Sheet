import { Component, OnInit, Input } from '@angular/core';
import { ModifiedMonster, CreatureModifier } from '../modifier/modifier.model';
import { Monster } from 'src/models/monsters/final-monster/monster.model';
import { JSONService } from 'src/app/services/json.service';


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
      }
    } else {
      this.jsonService.getAllMonsters().subscribe(data => {
        this.options = data;
      });
    }
    if (this.modifiedCreature && this.inputModifications) {
      this.modifiedCreature.modifications = this.inputModifications;
    }
  }

  public get modifications() {
    return this.modifiedCreature.modifications;
  }
  public setNewMonster(event) {
    // console.log(event.value, this.Monster);
    this.modifiedCreature = ModifiedMonster.FromMonster(this.Monster);
    // this.modifiedCreature.name = 'Larry';
  }
}
