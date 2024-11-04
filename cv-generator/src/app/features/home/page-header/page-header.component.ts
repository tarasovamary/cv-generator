import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter, take } from 'rxjs';
import { selectEmployeeById } from '../employees/store/employees.selectors';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [BreadcrumbModule, NgIf],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent implements OnInit {
  items: MenuItem[] = [];
  lastBreadcrumbLabel: string | undefined = '';

  constructor(
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit() {
    this.createBreadcrumbs();
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.createBreadcrumbs();
    });
  }

  private createBreadcrumbs() {
    const root = this.router.routerState.snapshot.root;
    this.items = this.createBreadcrumbsFromRoute(root);
    this.lastBreadcrumbLabel = this.items.length ? this.items[this.items.length - 1].label : '';
  }

  private createBreadcrumbsFromRoute(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: MenuItem[] = [],
  ): MenuItem[] {
    const children: ActivatedRouteSnapshot[] = route.children;
    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      const routeURL: string = child.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;

        let label = routeURL.charAt(0).toUpperCase() + routeURL.slice(1);

        if (this.isEmployeeId(routeURL)) {
          this.store.pipe(select(selectEmployeeById(routeURL)), take(1)).subscribe((employee) => {
            if (employee) label = employee.firstName + ' ' + employee.lastName;
          });
        }

        breadcrumbs.push({ label, routerLink: url });
      }

      this.createBreadcrumbsFromRoute(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  private isEmployeeId(routeURL: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(routeURL);
  }
}
