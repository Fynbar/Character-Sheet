import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpellListComponent } from './components/Spells/spell-list/spell-list.component';
import { MonsterPageComponent } from './components/monster/monster-page/monster-page.component';
import { MonsterBuilderComponent } from './components/monster/monster-builder/monster-builder.component';
import { MonsterComponent } from './components/monster/monster.component';
import { HomeComponent } from './components/home/home.component';
import { ModifierBuilderComponent } from './components/modifiers/modifier-builder/modifier-builder.component';



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
  // { path: '**', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
