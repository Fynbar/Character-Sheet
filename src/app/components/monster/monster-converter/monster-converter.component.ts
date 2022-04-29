import { Component, OnInit } from '@angular/core';
import { TetraMonster } from '../../../../models/monsters/tetra-monster';
import { ToolsFile, ToolsMonster } from '../../../../models/monsters/tools-monster';

@Component({
  selector: 'app-monster-converter',
  templateUrl: './monster-converter.component.html',
  styleUrls: ['./monster-converter.component.css']
})
export class MonsterConverterComponent implements OnInit {
  public checked = true;
  public LoadedMon: TetraMonster[] = [];
  public OutputMon: ToolsMonster[] = [];
  constructor() { }

  ngOnInit(): void {
    console.log()
  }
}
