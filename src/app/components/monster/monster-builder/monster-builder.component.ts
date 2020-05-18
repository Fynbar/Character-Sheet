import { Component, OnInit } from '@angular/core';
import { JSONService } from '../../json.service';
import * as data from '../../../../assets/data/mon_man_addition.json';

@Component({
  selector: 'app-monster-builder',
  templateUrl: './monster-builder.component.html',
  styleUrls: ['./monster-builder.component.css']
})
export class MonsterBuilderComponent implements OnInit {
  constructor(
    private jsonService: JSONService
  ) { }

  ngOnInit() {
      console.log(data);
  }
}
