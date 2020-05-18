import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
// import { ThermoStateData } from '../models/thermo-state.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
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

  public getAllEmployees() {
    return this.http.get(this.URL + 'employees').pipe(map(data => data as JSON));
  }

  // public getThermoStates(stateId?: number): Observable<ThermoStateData> {
  //   const stateIdUrl = stateId ? `/${stateId}` : null;
  //   return this.http.get<ThermoStateData>(this.URL + 'states' + stateIdUrl);
  // }

  // public getSaturationLimits(): Observable<ThermoStateData[]> {
  //   return this.http.get<ThermoStateData[]>(this.URL + 'stateLimits').pipe(tap(data => console.log(data)));
  // }

  // public getAllBeamEndConditions(): Observable<EndCondition[]> {
  //   return this.http.get<EndCondition[]>(this.URL + 'beamEnds');
  // }
}
