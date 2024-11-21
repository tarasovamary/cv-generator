import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { Store } from '@ngrx/store';
import { selectAllProjects } from '../../store/projects.selectors';
import * as ProjectsActions from '../../store/projects.actions';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [TableModule, ButtonModule, AsyncPipe, NgIf, RouterLink, ConfirmDialogModule, ToastModule, DatePipe],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<Project[]> ;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ProjectsActions.getAllProjects());
    this.projects$ = this.store.select(selectAllProjects);
  }

  onSelect(id: string) {}
  onDelete(id: string, event: MouseEvent) {}
}
