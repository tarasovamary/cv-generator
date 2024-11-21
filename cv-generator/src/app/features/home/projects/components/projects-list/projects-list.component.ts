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
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [TableModule, ButtonModule, AsyncPipe, NgIf, RouterLink, ConfirmDialogModule, ToastModule, DatePipe],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<Project[]> = this.store.select(selectAllProjects);

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProjectsActions.getAllProjects());
  }

  onSelect(id: string) {}

  onDelete(id: string, event: MouseEvent) {
    event.stopPropagation(); // Stops the click event that triggering the onSelect

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this project?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(ProjectsActions.deleteProjectById({ id }));
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Project deletion cancelled',
        });
      },
    });
  }
}
