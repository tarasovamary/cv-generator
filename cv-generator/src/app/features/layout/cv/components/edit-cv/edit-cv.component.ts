import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CvFormComponent, InitialCvFormState } from '../cv-form/cv-form.component';

@Component({
  selector: 'app-edit-cv',
  standalone: true,
  imports: [CvFormComponent, NgIf],
  templateUrl: './edit-cv.component.html',
  styleUrl: './edit-cv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCvComponent {
  cvId!: string;
  initialCvFormState: InitialCvFormState;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cvId = this.route.snapshot.paramMap.get('id');

    this.initialCvFormState = {
      entityId: this.cvId,
      entityType: 'cv',
    };
  }
}
