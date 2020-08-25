import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';
import { SpellListComponent } from './components/Spells/spell-list/spell-list.component';
import { MonsterPageComponent } from './components/monster/monster-page/monster-page.component';
import { MonsterBuilderComponent } from './components/monster/monster-builder/monster-builder.component';
import { MonsterComponent } from './components/monster/monster.component';
import { HomeComponent } from './components/home/home.component';
import { ModifierBuilderComponent } from './components/modifiers/modifier-builder/modifier-builder.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { MenuItem } from 'primeng/api/menuitem';
import { CombatComponent } from './components/combat/combat.component';
import { InitTrackerComponent } from './components/combat/init-tracker/init-tracker.component';
import { EncounterBuilderComponent } from './components/combat/encounter-builder/encounter-builder.component';
import { EncounterViewerComponent } from './components/combat/encounter-viewer/encounter-viewer.component';
import { capEach } from './common/string.functions';



export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'monster', component: MonsterComponent, children: [
      { path: 'view', component: MonsterPageComponent },
      { path: 'build', component: MonsterBuilderComponent },
      { path: 'modify', component: ModifierBuilderComponent },
    ]
  },
  {
    path: 'spells', children: [
      { path: 'list', component: SpellListComponent },
      // { path: 'psychro', component: PsychrometricComponent }
    ]
  },
  {
    path: 'equipment', component: EquipmentComponent, children: [
      // { path: 'weapons', component: wea },
      // { path: 'psychro', component: PsychrometricComponent }
    ]
  },
  {
    path: 'combat', component: CombatComponent, children: [
      { path: 'Initiative Tracker', component: InitTrackerComponent },
      { path: 'Encounter Builder', component: EncounterBuilderComponent },
      { path: 'Encounter Viewer', component: EncounterViewerComponent },
      // { path: 'psychro', component: PsychrometricComponent }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

function routeToMenuItem(r: Route, p?: string): MenuItem {
  const path = p ? `${p}/${r.path}` : r.path;
  const menu: MenuItem = { routerLink: path, label: capEach(r.path)};
  if (r.children) {
    menu.items = r.children.map(c => routeToMenuItem(c, path));
  }
  return menu;
}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static generateMenuItems(): MenuItem[] {
    return routes.filter(f => !f.redirectTo).map(r => routeToMenuItem(r));
  }
}
