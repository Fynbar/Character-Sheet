import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { JSONService } from '../../json.service';
import { MonsterCreature } from './monsterCreature';
import { stripString, spaceSplit, spaceJoin, stripArray, commaSplit } from '../../../common/string.functions';
import { abbrevToAbility } from '../../../../models/ability.enum';
import { Monster } from 'src/models/monster.model';
// import { ConsoleReporter } from 'jasmine';
// import * as data from '../../../../assets/data/mon_man_addition.json';


export interface MonsterMonMan {
  see: null | string;
  page: number | null;
  name: string;
  page_desc?: string;
  flavor_text?: string;
}

@Component({
  selector: 'app-monster-builder',
  templateUrl: './monster-builder.component.html',
  styleUrls: ['./monster-builder.component.css']
})

export class MonsterBuilderComponent implements OnInit {
  // , AfterViewInit
  // // @ViewChild('one') d1: ElementRef;
  // @ViewChild('one', { read: ElementRef }) d1: ElementRef;
  cols = [
    { field: 'name', header: 'Name' },
    { field: 'page', header: 'Page' },
    // { field: 'see', header: 'See' },
  ];
  constructor(
    private jsonService: JSONService
  ) { }
  private monsters: MonsterMonMan[] = [];
  private temp: MonsterMonMan[] = [];


  // ngAfterViewInit() {
  //   this.d1.nativeElement.insertAdjacentHTML('beforeend', '<app-dice [diceType]=12></app-dice> two');
  // }

  ngOnInit() {
    // console.log(data);
    this.jsonService.getJSON('mon_man_addition').subscribe(data => {
      this.monsters = data;
      // console.log(this.monsters);
      // console.log(this.filMon);
    });
    console.log(Object.values(abbrevToAbility));
  }

  public handleClick(event) {
    this.jsonService.saveJSON('mon_man_addition', this.monsters).subscribe(data => {
      console.log(event);
      console.log('Saved!');
    });
  }

  public get copyVal(): string {
    return JSON.stringify(this.monsters);
  }

  public copyInputMessage() {
    const val = this.copyVal;
    // console.log(val);
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log('Copied');
  }

  public onRowExpand(event, data) {
    // console.log(data);
    console.log(this.monsters);
    this.monsters = this.temp;
  }

  public get monLen(): number {
    return this.monsters.length;
  }

  public get monsterNames(): string[] {
    return this.monsters.map(m => m.name);
  }

  public get filMon(): any[] {

    return this.monsters.filter(m => (!m.see)).map(m => this.fromPageDesc(m));
  }

  public fromPageDesc(m: MonsterMonMan): MonsterCreature {
    return MonsterCreature.fromPageDesc(m);
  }

  // public set filMon(monsters: MonsterMonMan[]) {
  //   monsters.forEach(m =>
  //     this.temp[this.monsterNames.indexOf(m.name)] = m
  //   );
  //   console.log(this.monsters);
  // }

}



