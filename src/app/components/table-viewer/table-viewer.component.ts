import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-viewer',
  templateUrl: './table-viewer.component.html',
  styleUrls: ['./table-viewer.component.css']
})
export class TableViewerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export interface Table {
  name: string;
  tablevalues: { values: string[] | number[] | Table[], valueType?: string }[];
}

export class TableBuilder implements Table {
  name: string;
  tableviewing: { range: number[], values: string[] | number[] | Table[] }[];
  tablevalues: { values: string[] | number[] | Table[], valueType?: string }[];
  constructor(table: Table) {
    this.name = name;
    this.tablevalues = table.tablevalues;
  }
    // roll() {
    //   return length;
    // }
  // get tableviewing(): { range: number[], values: string[] | number[] | Table[] }[];

}
