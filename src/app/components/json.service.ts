import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
// import { ThermoStateData } from '../models/thermo-state.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { EndCondition } from './deform/beam-bending/beam-bending.component';

@Injectable({
  providedIn: 'root'
})
export class JSONService {
  constructor(private http: HttpClient) { }

  dataFolderPath = 'assets/data/';
  jsonFileType = '.json';
  private jsonify(filename: string): string {
    console.log(this.dataFolderPath + filename + this.jsonFileType);
    return this.dataFolderPath + filename + this.jsonFileType;
  }

  public getJSON(filename: string): Observable<any> {
    return this.http.get(this.jsonify(filename));
  }

  public saveJSON(filename: string, post: any): Observable<any> {
    return this.http.post(this.jsonify(filename), post);
  }
}

