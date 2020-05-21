import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CharacterSheet';
  public items: MenuItem[] = [
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
        { routerLink: 'spells/list', label: 'SpellList' },
        // { routerLink: 'psychro', label: 'Psychrometric' }
      ]
    }
  ];
}
