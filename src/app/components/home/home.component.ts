import { Component, OnInit } from '@angular/core';
import { PythonService } from 'src/app/services/python.service';
import { DiceComponent } from '../dice/dice.component';
import { Die } from '../dice/dice';
import { Observable } from 'rxjs';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';
import { tap } from 'rxjs/operators';
import { JSONService } from 'src/app/services/json.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service: PythonService,
              public JSON: JSONService) { }
  tests = [];
  monsters = [];
  cols=[];
  ngOnInit() {
    this.servicetester(this.service.sayHi());
    this.servicetester(this.service.rollDice(new Die(20, 2, 1)).pipe(tap(_ => this.servicetester(this.service.getDiceHistory()))));
    this.JSON.getAllMonsters().pipe(tap(d => console.log(d))).subscribe(d =>
      this.monsters = d.filter(m => m.hitPoints && m.meta)
    );

    // this.service.saveJSONFile('Bet/test2', { name: 'Greg' }).subscribe(d =>
    //   console.log(d)
    // );

  }
  public servicetester(serviceCall: Observable<any>) {
    serviceCall.pipe(tap(d =>
      console.log(d))
    ).subscribe(d => this.tests.push(d));
  }

  public get testOut() {
    return this.tests.length < 3 ? this.tests  : ['Python API Works!!'];
  }
}
