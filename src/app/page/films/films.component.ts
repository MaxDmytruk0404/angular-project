import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SearchComponent } from '../../ui/home/search/search.component';
import { FilmBlockComponent } from '../../ui/films/film-block/film-block.component';

import { FilmsService } from '../../service/films/films.service';
import { SearchService } from '../../service/search/search.service';

import { environment } from '../../../environments/environment';
import { MessageService } from '../../service/message/message.service';
import { ButtonAddToSaveComponent } from '../../ui/films/button-add-to-save/button-add-to-save.component';


@Component({
  selector: 'app-films',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, SearchComponent,FilmBlockComponent, ButtonAddToSaveComponent],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css',
})

export class FilmsComponent implements OnInit {
  films: any[] = []; // Масив з інформаціюєю про фільм
  filmId: string = ''; // Айді фільма
  api: string = environment.ApiOMDB; // API для побудови посилання за яким отримується інформація про фільми

  errorMessage: string = ''; // Повідомлення про помиилку яке виводиться на сторінку у повні моменти
  message: string = ''; // Звичайне повідомлення яке виводиться на сторінку у повні моменти

  maxNumberPage: number = 1; // Максимальна кількість сторінок
  page: number = 1; // Сторінка на якій знаходиться користувач
  enterPageNumber: number = 1; // Введена сторінка для пошуку

  userLoadded: string = 'false'; // Вказує чи авторизувався користувач
  searchProces: boolean = false; // Вказує чи відбувається процес пошуку фільма чи серіала
  receviedFilm: boolean = false; // Вказує чи фільм було отримано


  constructor(
    private filmsServiсe: FilmsService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private massageService: MessageService
  ) {}

  ngOnInit(): void {

    // Повідомлення про помилку або про те що фільм збережений в saves 
    
    this.massageService.messageStaus$.subscribe( (message) => {
      this.message = message
    })

    this.massageService.errorMessageStaus$.subscribe( (errorMessage) => {
      this.errorMessage = errorMessage
    })
    

    this.route.params.subscribe((params) => {

      this.getFilmsByCategory();

    });

  }

  // Отримання фільмів

  getFilmsByCategory(): void {

    this.searchProces = true;

    if (typeof window !== 'undefined' && window.localStorage) {

      const serchParamsLocal = localStorage.getItem('searchParams');

      const searchParams = serchParamsLocal ? JSON.parse(serchParamsLocal) : {};

      let filmApi;

      if (searchParams.category == 'all') {

        filmApi = `${this.api}?s=${searchParams.name}&page=${searchParams.page}&apikey=aae28dc3`;

      } else {

        filmApi = `${this.api}?type=${searchParams.category}&s=${searchParams.name}&page=${searchParams.page}&apikey=aae28dc3`;

      }

      this.filmsServiсe.getAll(filmApi).subscribe((data) => {

        this.films = data.Search;
        this.maxNumberPage = Math.ceil(parseInt(data.totalResults) / 10);
        this.receviedFilm = true;
        this.searchProces = false;
        this.errorMessage = '';

        if (this.maxNumberPage) {
          this.searchService.filterVisibel(true);
        }

        if (isNaN(this.maxNumberPage)) {
          this.errorMessage = 'Not Found!';
          this.receviedFilm = false;
          setTimeout(() => {
            this.errorMessage = this.errorMessage.replace('Not Found!', '');
          }, 2800);
        }

      });

    }

  }

  // перехід на попередню сторінку

  prevPage(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      const filmSerchParamsLocal = localStorage.getItem('searchParams');

      const filmSerchParams = filmSerchParamsLocal
        ? JSON.parse(filmSerchParamsLocal)
        : {};

      if (filmSerchParams.page > 1) {

        const newSerchParsms = {
          name: filmSerchParams.name,
          category: filmSerchParams.category,
          page: filmSerchParams.page - 1,
        };

        this.page = filmSerchParams.page - 1;

        localStorage.setItem('searchParams', JSON.stringify(newSerchParsms));

        this.getFilmsByCategory();
        this.errorMessage = '';

      }

    }

  }

  // Перехід на наступну сторінку

  nextPage(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      const filmSerchParamsLocal = localStorage.getItem('searchParams');

      const filmSerchParams = filmSerchParamsLocal
        ? JSON.parse(filmSerchParamsLocal)
        : {};

      if (filmSerchParams.page < this.maxNumberPage) {

        const newFilmSerchParams = {
          name: filmSerchParams.name,
          category: filmSerchParams.category,
          page: filmSerchParams.page + 1,
        };

        this.page = filmSerchParams.page + 1;

        localStorage.setItem('searchParams', JSON.stringify(newFilmSerchParams));

        this.getFilmsByCategory();
        this.errorMessage = '';

      }

    }

  }

  // Пошук за введеним номером сторінки

  enterPage(): void {

    this.page = this.enterPageNumber;

    if (typeof window !== 'undefined' && window.localStorage) {

      if (typeof window !== 'undefined' && window.localStorage) {

        const filmSerchParamsLocal = localStorage.getItem('searchParams');

        const filmSerchParams = filmSerchParamsLocal
          ? JSON.parse(filmSerchParamsLocal)
          : {};

        const newfilmSerchParams = {
          name: filmSerchParams.name,
          category: filmSerchParams.category,
          page: this.page,
        };

        localStorage.setItem('searchParams', JSON.stringify(newfilmSerchParams));

        if (filmSerchParams.page > this.maxNumberPage) {

          const newfilmSerchParams = {
            name: filmSerchParams.name,
            category: filmSerchParams.category,
            page: this.maxNumberPage,

          };

          localStorage.setItem('searchParams', JSON.stringify(newfilmSerchParams));
          this.getFilmsByCategory();
          this.page = this.maxNumberPage;

        } else if (filmSerchParams.page < 1) {

          const newfilmSerchParams = {
            name: filmSerchParams.name,
            category: filmSerchParams.category,
            page: 1,

          };

          localStorage.setItem('searchParams', JSON.stringify(newfilmSerchParams));
          this.getFilmsByCategory();
          this.page = 1;

        } else {

          this.getFilmsByCategory();
          this.errorMessage = '';

        }

      }

    }
    this.enterPageNumber = 1;
  }

}
