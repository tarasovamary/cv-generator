import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [TableModule, ButtonModule, AsyncPipe, NgIf, RouterLink, ConfirmDialogModule, ToastModule, DatePipe],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
})
export class ProjectsListComponent {
  projects$: Observable<Project[]>;

  constructor() {}

  onSelect(id: string) {}
  onDelete(id: string, event: MouseEvent) {}
}
