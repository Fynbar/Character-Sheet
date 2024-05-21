import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, mergeMap } from 'rxjs/operators';
// import { ThermoStateData } from '../models/thermo-state.model';
import { environment } from '../../environments/environment';
import { forkJoin, Observable } from 'rxjs';
import { Dice, Die, Roll } from '../components/dice/dice';
import { DiceHistory, SDice, SDie } from '../components/dice/stringDice';
// import { EndCondition } from './deform/beam-bending/beam-bending.component';

@Injectable({
  providedIn: 'root'
})
export class PythonService {
  URL = environment.APIURL;
  constructor(private http: HttpClient) {
  }

  public sayHi() {
    return this.http.get(this.URL).pipe(
      map(data => data as JSON),
      tap(data => console.log(data))
    );
  }

  public saveHi() {
    return this.http.post(this.URL, { name: 'Greg' }).pipe(
      // map(data => data as JSON),
      tap(data => console.log(data))
    );
  }

  public saveJSONFile(filename: string, jsonFile: any) {
    return this.http.post(this.URL + 'saveJSON', { name: filename, body: jsonFile }).pipe(
      // map(data => data as JSON),
      tap(data => console.log(data))
    );
  }

  public getAllEmployees() {
    return this.http.get(this.URL + 'employees').pipe(map(data => data as JSON));
  }

  public rollDice(rollingDie: Die, Reroll?: number[], Highest?: number, Lowest?: number): Observable<Roll> {
    return this.http.post<Roll>(this.URL + 'diceHistory', {
      dice: rollingDie, reroll: Reroll ? Reroll : [], highest: Highest ? Highest : 0, lowest: Lowest ? Lowest : 0
    })
    // .pipe(map(d => d[-1]))
    ;
  }

  public postSDieRoll(dieString: string): Observable<string> {
    return this.http.post<string>(this.URL + 'dice', {string: dieString});
  }

  public postSDiceRoll(dieString: string[]): Observable<string[]> {
    return this.http.post<string[]>(this.URL + 'dice', {string: dieString});
  }

  public getSDieRoll(id: string): Observable<SDie> {
    return this.http.get<SDie>(this.URL + 'dice/'+id);
  }


  public stringRollDie(dieString: string): Observable<SDie> {
    // Post the string and then read the id number
    return this.postSDieRoll(dieString).pipe(mergeMap(u => this.getSDieRoll(u)))
  }

  public stringRollDice(dieString: string[]): Observable<SDice> {
    // Post the string and then read the id number
    return this.postSDiceRoll(dieString).pipe(
      // map(users => users.map(this.getOrdersForUser)),
      // switchMap(userWithOrders$ => forkJoin(...userWithOrders$))
      mergeMap(
        u =>  forkJoin(u.map(s => this.getSDieRoll(s)))
      )
    )
  }
  public getDiceHistory(): Observable<DiceHistory> {
    return this.http.get<DiceHistory>(this.URL + 'diceHistory');
  }
}
