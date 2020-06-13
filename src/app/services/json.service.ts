import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
// import { ThermoStateData } from '../models/thermo-state.model';
import { environment } from '../../environments/environment';
import { Observable, forkJoin } from 'rxjs';
import { Item } from 'src/models/equipment/equipment.model';
import { WeaponComponent } from '../components/equipment/weapon/weapon.component';
import { Weapon } from 'src/models/equipment/weapon.model';
import { Monster } from 'src/models/monsters/final-monster/monster.model';
// import { EndCondition } from './deform/beam-bending/beam-bending.component';

enum EquipmentCategory {
  AdventuringGear = 'Adventuring Gear',
  Tools = 'Tools',
  Armor = 'Armor',
  MountsAndVehicles = 'Mounts and Vehicles',
  Weapon = 'Weapon',
}


@Injectable({
  providedIn: 'root'
})
export class JSONService {
  constructor(private http: HttpClient) { }

  dataFolderPath = 'assets/data/';
  jsonFileType = '.json';
  private jsonify(filename: string): string {
    // console.log(this.dataFolderPath + filename + this.jsonFileType);
    return this.dataFolderPath + filename + this.jsonFileType;
  }

  public getJSON(filename: string): Observable<any> {
    return this.http.get(this.jsonify(filename));
  }

  public saveJSON(filename: string, post: any): Observable<any> {
    return this.http.post(this.jsonify(filename), post);
  }

  public getEquipmentJSON(equipmentCategory?: EquipmentCategory): Observable<Item[]> {
    let response = this.getJSON('apiEquipment');
    if (equipmentCategory) {
      response = response.pipe(map(r => r[equipmentCategory]));
    } else {
      response = response.pipe(map(z =>
        [].concat(...Object.keys(z)
          .map(o => z[o]))
      ));
    }
    return response;
  }
  public getAllMonsters(): Observable<Monster[]> {
    return forkJoin(...['monsterManualAdditions', 'srdMonsterAdditions', 'voloMonsterAdditions']
      .map(n => this.getJSON(n))).pipe(
        map((d: Monster[][]) => {
          let s = [];
          d.forEach((element: Monster[]) => s = s.concat(...element));
          return s;
        })
      );
  }

  public getWeaponJSON(): Observable<Weapon[]> {
    return this.getEquipmentJSON(EquipmentCategory.Weapon).pipe(map(ws => ws.map(w => itemToWeapon(w))));
    // .pipe(map(s => s.map(w => WeaponComponent.weaponFromAPI(w))));
    // return this.getEquipmentJSON('Weapon');
  }

  public getWeaponListOrganized(): Observable<{ label: string, items: { label: string, value: Weapon }[] }[]> {
    return this.getWeaponJSON().pipe(
      map(ws => {
        let categoryTypes = ws.map(w => w.categoryRange);
        categoryTypes = categoryTypes.filter((f, i) => categoryTypes.indexOf(f) === i);
        return categoryTypes.map(c => (
          {
            label: c,
            items: ws.filter(f => f.categoryRange === c).map(w => ({ label: w.name, value: w }))
          }));
      }
      ), tap(z => console.log(z))
    );
  }
}

function stringFromAPI(str): string {
  return str.split('_').map((s, i) => i === 0 ? s : `${s[0]}${s.slice(1)}`).join('');
}

export function itemToWeapon(w): Weapon { return w; }

