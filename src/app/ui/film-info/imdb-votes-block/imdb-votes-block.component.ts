import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmInfoService } from '../../../service/film-info/film-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-imdb-votes-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imdb-votes-block.component.html',
  styleUrl: './imdb-votes-block.component.css'
})

export class ImdbVotesBlockComponent implements OnInit {

  filmInfo: any;
  filmId: any;
  votes: any;

  constructor(
    private route: ActivatedRoute,
    private filmInfoService: FilmInfoService,
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {

      this.filmId = params.get('id') ?? '';

      this.filmInfoService.getFilmInfo(this.filmId).subscribe((data) => {

        this.filmInfo = data;
        this.votes = data.imdbVotes;

      });

    });
    
  }
}
