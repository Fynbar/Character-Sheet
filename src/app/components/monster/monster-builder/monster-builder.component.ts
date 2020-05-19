import { Component, OnInit } from '@angular/core';
import { JSONService } from '../../json.service';
import { stringify } from 'querystring';
// import * as data from '../../../../assets/data/mon_man_addition.json';


interface Monster {
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
  constructor(
    private jsonService: JSONService
  ) { }
  private monsters: Monster[] = [];
  private temp: Monster[] = [];
  public buttonstring = '<div> Lemons <br/>my guy</div>';
  cols = [
    { field: 'name', header: 'Name' },
    { field: 'page', header: 'Page' },
    // { field: 'see', header: 'See' },
  ];
  ngOnInit() {
    // console.log(data);
    this.jsonService.getJSON('mon_man_addition').subscribe(data => {
      this.monsters = data;
      console.log(this.monsters);
      console.log(this.filMon);
    });
  }

  public handleClick(event) {
    this.jsonService.saveJSON('mon_man_addition', this.monsters).subscribe(data => {
      console.log(event);
      console.log('Saved!');
    });
  }

  public copyInputMessage() {
      const val = JSON.stringify(this.monsters);
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

  public get filMon(): Monster[] {
    return this.monsters.filter(m => (!m.flavor_text && !m.see));
  }

  public set filMon(monsters: Monster[]) {
    monsters.forEach(m =>
      this.temp[this.monsterNames.indexOf(m.name)] = m
    );
    console.log(this.monsters);
  }

}
