import { Component, OnInit } from '@angular/core';
import { JSONService } from 'src/app/services/json.service';
import { TetraMon } from '../../../../models/monsters/tetra-monster';
import { ToolsFile, ToolsMonster } from '../../../../models/monsters/tools-monster';
// import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-monster-converter',
  templateUrl: './monster-converter.component.html',
  styleUrls: ['./monster-converter.component.css']
})
export class MonsterConverterComponent implements OnInit {
  public checked = true;
  public LoadedMon: TetraMon[] = [];
  public OutputMon: ToolsMonster[] = [];
  constructor(
    private jsonService: JSONService
    // , public dialogService: DialogService
  ) { }
  // ref: DynamicDialogRef;

  ngOnInit(): void {
    console.log()
    this.jsonService.getJSON('the woman').pipe(
      tap(m => console.log(m)),
      map(ms => new TetraMon(ms).toToolMon())
    ).subscribe(data => { this.OutputMon[0] = data })
  }
}
