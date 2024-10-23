import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private router: Router) {}

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
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
