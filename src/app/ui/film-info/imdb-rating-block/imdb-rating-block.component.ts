import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { FilmInfoService } from '../../../service/film-info/film-info.service';

@Component({
  selector: 'app-imdb-rating-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imdb-rating-block.component.html',
  styleUrl: './imdb-rating-block.component.css',
})
export class IMDBRatingBlockComponent implements OnInit {

  filmInfo: any;
  filmId: any;
  rating: any;

  constructor(
    private route: ActivatedRoute,
    private filmInfoService: FilmInfoService,
    private renderer: Renderer2, 
    private el: ElementRef
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {

      this.filmId = params.get('id') ?? '';

      this.filmInfoService.getFilmInfo(this.filmId).subscribe((data) => {

        this.filmInfo = data;
        this.rating = data.imdbRating;
        const ProcentRating = Math.round((data.imdbRating / 10)*360)
        console.log(data)

        const progressDiv = this.el.nativeElement.querySelector('.my-progres-rating');

        progressDiv.style.setProperty('--IMDBrating', `${ProcentRating}deg`);

      });

    });
    
  }
}
