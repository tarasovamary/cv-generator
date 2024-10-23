import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuModule } from 'primeng/menu';
import * as AuthActions from '../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.onLogout(),
      },
    ];
  }

  onLogout() {
    // Remove user tokens and id from storage and redirect to login page
    this.store.dispatch(AuthActions.logout());
  }
}
