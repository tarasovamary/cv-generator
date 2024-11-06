import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss',
})
export class CvComponent {}
