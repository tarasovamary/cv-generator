import { Component } from '@angular/core';
import { CvFormComponent } from '../cv-form/cv-form.component';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-cv',
  standalone: true,
  imports: [CvFormComponent, NgIf],
  templateUrl: './edit-cv.component.html',
  styleUrl: './edit-cv.component.scss',
})
export class EditCvComponent {
  cvId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cvId = this.route.snapshot.paramMap.get('id')!;
  }
}
