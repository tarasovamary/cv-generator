import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter, tap } from 'rxjs';

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

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize breadcrumbs on first load
    this.createBreadcrumbs();

    // Update breadcrumbs on navigation
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.createBreadcrumbs();
    });
  }

  private createBreadcrumbs() {
    const root = this.router.routerState.snapshot.root;
    this.items = this.createBreadcrumbsFromRoute(root);

    // Update the last breadcrumb label based on the last item
    this.lastBreadcrumbLabel = this.items.length ? this.items[this.items.length - 1].label : '';
  }

  private createBreadcrumbsFromRoute(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: MenuItem[] = [],
  ): MenuItem[] {
    const children: ActivatedRouteSnapshot[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
        breadcrumbs.push({ label: routeURL.charAt(0).toUpperCase() + routeURL.slice(1), routerLink: url });
      }

      this.createBreadcrumbsFromRoute(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}
