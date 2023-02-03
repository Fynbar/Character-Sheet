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
  dice = ''
  ngOnInit() {
    this.servicetester(this.service.sayHi());
    this.servicetester(this.service.stringRollDie('2d20kh1'));
  //   this.servicetester(this.service.stringRollDice([
  //     '{2d20; 10}kh1',
  //     '{2d20}+5',
  //         '{6d20}kh2',
  //     '{6d20}dh2',
  //     '{6d20}kl2',
  //     '{6d20}dl2',
  //     '2d20-1d4','2d20kh1', '5',
  //         '6*2d20', '2d10/2','6d4kh(1d4)',
  //     '{100d100; 5d2000}kh1',
  //     '4d6e3',
  //     '5d6r<=5',
  //     '5d6ro>=3',
  //     '1d20+4>=10',
  //     '2d20kh1+5>=10'
  // ]));
    this.servicetester(this.service.getDiceHistory());
    this.JSON.getAllMonsters().pipe(tap(d => console.log(d))).subscribe(d =>
      this.monsters = d.filter(m => m.hitPoints && m.meta)
    );

    // this.service.saveJSONFile('Bet/test2', { name: 'Greg' }).subscribe(d =>
    //   console.log(d)
    // );
  }

  public BlurRoll($event): void{
    console.log('\"Rolling\" ' + this.dice)
    // this.servicetester(this.service.stringRollDie(this.dice));
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
