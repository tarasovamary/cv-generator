import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [ProjectFormComponent],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectComponent {}
