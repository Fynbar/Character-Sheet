import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
// import { ThermoStateData } from '../models/thermo-state.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Die, Roll } from '../components/dice/dice';
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

  public getDiceHistory(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + 'diceHistory');
  }
}
