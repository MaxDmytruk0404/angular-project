import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmInfoService } from '../../../service/film-info/film-info.service';

@Component({
  selector: 'app-trailer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trailer.component.html',
  styleUrl: './trailer.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrailerComponent implements OnInit {

  filmId: string = ''; // Айді фільму
  tmdbId: string = ''; // Айді для трейлеру
  filmInfo: any; // Усі данні про фільм
  trelerId: any; // Айді трейлера на ютубі
  apiKey: string = '';

  constructor(private route: ActivatedRoute, private filmInfoService: FilmInfoService) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {

      this.filmId = params.get('id') ?? '';

      this.filmInfoService.getFilmInfo(this.filmId).subscribe( data => {

        this.filmInfo = data;

        this.getFilmTriler();


      })

    });

  }

  getFilmTriler() {

    if (this.filmInfo.Type == 'movie') {

      this.filmInfoService.getTmdbInfoByCategory(this.filmId, 'movie').subscribe( data => {

        let trailers;

        if (data.results) {

          trailers = data.results.filter((video: { type: string; }) => video.type === 'Trailer');

        } else {

          trailers = '';

        }

        if (trailers) {

          this.trelerId =  trailers[0].key;

        } else {

          this.trelerId ='';

        }

      })

    } else {

      this.filmInfoService.getTmdbInfo(this.filmId).subscribe( dataInfo => {

        let tmdbId = dataInfo.tv_results[0].id

        this.filmInfoService.getTmdbInfoByCategory(tmdbId, 'tv').subscribe( data => {

          let trailers;

         if (data.results) {

            trailers = data.results.filter((video: { type: string; }) => video.type === 'Trailer');

          } else {

           trailers = '';

          }

          if (trailers) {

            this.trelerId =  trailers[0].key;

          } else {

            this.trelerId ='';

          }

        })


      })

    }

  }


}
