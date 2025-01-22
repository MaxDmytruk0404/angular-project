import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta} from '@angular/platform-browser';

import { StarRatingComponent } from '../../ui/film-info/star-rating/star-rating.component';
import { ComentariesComponent } from '../../page-component/comentaries/comentaries.component';
import { TrailerComponent } from '../../ui/film-info/trailer/trailer.component';
import { IMDBRatingBlockComponent } from '../../ui/film-info/imdb-rating-block/imdb-rating-block.component';
import { ImdbVotesBlockComponent } from '../../ui/film-info/imdb-votes-block/imdb-votes-block.component';
import { MiniBlockComponent } from '../../ui/film-info/mini-block/mini-block.component';
import { BlockOtherInfoComponent } from '../../ui/film-info/block-other-info/block-other-info.component';

import { FilmInfoService } from '../../service/film-info/film-info.service';
import { DataOperationService } from '../../service/dataOperation/data-operation.service';
import { ButtonAddListComponent } from '../../ui/film-info/button-add-list/button-add-list.component';


@Component({
  selector: 'app-film-info',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, ComentariesComponent, TrailerComponent, IMDBRatingBlockComponent, ImdbVotesBlockComponent,MiniBlockComponent, BlockOtherInfoComponent, ButtonAddListComponent],
  templateUrl: './film-info.component.html',
  styleUrl: './film-info.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class FilmInfoComponent implements OnInit {

  filmId: string = ''; // Айді фільму
  filmInfo: any; // Усі данні про фільм

  raiting: number = 0; // Оцінка яку виставив користувач

  loadding: boolean = false; // Лоадер 
  userLoadded: string = 'false'; // Вказує чи увішов користувач в акаунт

  message: string = ''; // Повідомлення яке виводиться на сторінку і певні моменти

  constructor(
    private route: ActivatedRoute,
    private FilmInfoService: FilmInfoService,
    private meta: Meta,
  ) { }
  

  ngOnInit(): void {

    this.loadding = true;

    this.route.paramMap.subscribe((params) => {

      this.filmId = params.get('id') ?? '';

    });

    this.getFilmInfo();

    this.loadding = false;
  }


  // Отримання інформації про фільмів

  getFilmInfo(): void {

    this.FilmInfoService.getFilmInfo(this.filmId).subscribe((data) => {

      this.filmInfo = data;
      this.meta.updateTag({ name: 'description', content: `${this.filmInfo.Plot}` });

    });

  }

  // // Для оцінювання зірками

  Handle(event: number): void {
    
    this.message = `Thank you for your ${event} star rating`;
    this.raiting = event;
    
    setTimeout(() => {
      this.message = this.message.replace(this.message, '');
    }, 2800);

  }

}
