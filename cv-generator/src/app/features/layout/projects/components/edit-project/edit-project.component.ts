import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ProjectFormComponent],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectComponent {}
