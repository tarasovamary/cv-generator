import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import * as ProjectsActions from '../../store/projects.actions';
import { selectAllProjects } from '../../store/projects.selectors';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [TableModule, ButtonModule, AsyncPipe, NgIf, ConfirmDialogModule, ToastModule, DatePipe],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<Project[]> = this.store.select(selectAllProjects);

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProjectsActions.getAllProjects());
  }

  onCreateProject() {
    this.store.dispatch(ProjectsActions.resetCurrentProject());
    this.router.navigate(['../create'], { relativeTo: this.route });
  }

  onSelect(id: string) {
    this.store.dispatch(ProjectsActions.getProjectById({ id }));
    this.router.navigate(['../', id], { relativeTo: this.route });
  }

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
