import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-film-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-block.component.html',
  styleUrl: './film-block.component.css'
})
export class FilmBlockComponent {
  @Input() film!: {Title: string, Type: string, Year: number, Poster: string, imdbID: number};
}
