import { Component } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
// import {MenubarModule} from 'primeng/menubar';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CharacterSheet';
  public items: MenuItem[] = AppRoutingModule.generateMenuItems()
  /* [
    { routerLink: 'home', label: 'Home' },
    {
      routerLink: 'monster', label: 'Monster', items: [
        { routerLink: 'monster/view', label: 'Viewer' },
        { routerLink: 'monster/build', label: 'Build' },
        { routerLink: 'monster/modify', label: 'Modify'}
      ]
    },
    {
      routerLink: 'spells', label: 'Spells', items: [
        { routerLink: 'spells/list', label: 'Spell List' },
        // { routerLink: 'psychro', label: 'Psychrometric' }
      ]
    }
  ] */;
}
