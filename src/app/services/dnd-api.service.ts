import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap, map, flatMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DndApiService {
  URL = `http://dnd5eapi.co/api`;
  constructor(private http: HttpClient) {
  }

  public sayHi() {
  return this.http.get(this.URL).pipe(
    map(data => data as JSON),
    tap(data => console.log(data))
  );
}

  public getFromAPI(addedURL: string): Observable < any > {
  return this.http.get(`${this.URL}/${addedURL}`);
}

  public getAllSpecificFromAPI(addedURL: string): Observable < any[] > {
  return this.getFromAPI(addedURL).pipe(map(l => l.results));
}

  public geEveryOfSpecificFromAPI(addedURL: string): Observable < any[] > {
  return this.getAllSpecificFromAPI(addedURL).pipe(flatMap(results =>
    forkJoin(...results.map(r => this.getFromAPI(r.url.substing(6))))
  ));
}


  public getAllMonstersFromAPI(): Observable < any > {
  return this.geEveryOfSpecificFromAPI('monsters');
}
}
