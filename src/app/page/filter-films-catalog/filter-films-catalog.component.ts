import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SearchComponent } from '../../page-component/search/search.component';
import { FilmsService } from '../../service/films/films.service';
import { SearchService } from '../../service/search/search.service';
import { environment } from '../../../environments/environment';
import { AddToSavedService } from '../../service/add-to-saved/add-to-saved.service';
import { UpdateSavedStatusService } from '../../service/update-saved-status/update-saved-status.service';

@Component({
  selector: 'app-filter-films-catalog',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, SearchComponent],
  templateUrl: './filter-films-catalog.component.html',
  styleUrl: './filter-films-catalog.component.css',
})

export class FilterFilmsCatalogComponent implements OnInit {

  films: any[] = []; // Масив з інформацією про фільми
  filmId: string = ''; // Айді фільма
  api: string = environment.ApiTMDB; // API для будування посилання за яким отримуються фільми

  maxNumberPage: number = 1; // Максимальна кількість сторінок
  page: number = 1; // Сторінка на якій знаходиться користувач
  enterPageNumber: number = 1; // Введена сторінка для пошуку

  errorMessage: string = ''; // Повідомлення про помилку для користувача
  message: string = ''; // Повідомлення для користувача при певних діях

  userLoadded: string = 'false'; // Вказує чи увійшов користувач в систему
  searchProces: boolean = false; // Вказує чи іде процесотримання даних api
  receviedFilm: boolean = false; // Вказує чи було отримано фільми

  constructor(
    private filmsServiсe: FilmsService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private addToSavedService: AddToSavedService,
    private updateSavedStatusService: UpdateSavedStatusService
  ) {}

  ngOnInit(): void {

    if (typeof window !== 'undefined' && window.localStorage) { 

      this.userLoadded = localStorage.getItem('logged') || 'false';

    }

    if (this.userLoadded == 'true') {
      
      this.updateSavedStatusService.savedStaus$.subscribe(status => {
  
        if (status !== '') {
    
          let newStatus = status.includes('already added');
    
          if (newStatus) {
  
            this.errorMessage = `${status}`;
    
            setTimeout(() => {
              this.errorMessage = '';
            }, 2800);
    
          } else {
  
            this.message = `${status} added to Saved`;
    
            setTimeout(() => {
              this.message = '';
            }, 2800);
  
          }
    
          setTimeout(() => {
            this.updateSavedStatusService.resetSavedStatus();
          }, 3000); 
  
        }
      });

    }

    this.route.params.subscribe((params) => {

      this.getFilmsByCategory();

    });

  }

  // Отримання Фільмів

  getFilmsByCategory(): void {
    
    this.searchProces = true;

    this.FilterByCategory();

    this.filmsServiсe.getAll(this.searchService.filmApi).subscribe(
      (data) => {

        this.films = data.results;

        if (data.total_pages > 500) {

          this.maxNumberPage = 500;

        } else {

          this.maxNumberPage = data.total_pages;

        }

        this.receviedFilm = true;
        this.searchProces = false;
        this.errorMessage = '';

        if (this.films.length == 0) {

          this.errorMessage = 'Not Found!';
          this.receviedFilm = false;

          setTimeout(() => {
            this.errorMessage = '';
          }, 2800);

        }
        
      },
      (error) => {

        this.errorMessage = 'Not Found';

        setTimeout(() => {
          this.errorMessage = '';
        }, 2800);

        this.receviedFilm = false;
        this.searchProces = false;

      }

    );
  }

  // Перехід на попередню сторінку

  prevPage(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      const filterParamsLocal = localStorage.getItem('filterParams');

      const filterParams = filterParamsLocal
        ? JSON.parse(filterParamsLocal)
        : {};

      if (filterParams.page > 1) {

        const filterParsms = {
          category: filterParams.category,
          minYear: filterParams.minYear,
          maxYear: filterParams.maxYear,
          page: filterParams.page - 1,
          ganreFilme: filterParams.ganreFilme,
          ganreTv: filterParams.ganreTv,
        };

        this.page = filterParams.page - 1;

        localStorage.setItem('filterParams', JSON.stringify(filterParsms));

        this.getFilmsByCategory();
        this.errorMessage = '';

      }

    }

  }

  // Перехід на наступну сторінку

  nextPage(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      const filterParamsLocal = localStorage.getItem('filterParams');

      const filterParams = filterParamsLocal
        ? JSON.parse(filterParamsLocal)
        : {};

      if (filterParams.page < this.maxNumberPage) {

        const filterParsms = {
          category: filterParams.category,
          minYear: filterParams.minYear,
          maxYear: filterParams.maxYear,
          page: filterParams.page + 1,
          ganreFilme: filterParams.ganreFilme,
          ganreTv: filterParams.ganreTv,
        };

        this.page = filterParams.page + 1;

        localStorage.setItem('filterParams', JSON.stringify(filterParsms));

        this.getFilmsByCategory();
        this.errorMessage = '';

      }

    }

  }

  // Пошук за номером сторінки

  enterPage(): void {

    this.page = this.enterPageNumber;

    if (typeof window !== 'undefined' && window.localStorage) {

      const filterParamsLocal = localStorage.getItem('filterParams');

      const filterParams = filterParamsLocal
        ? JSON.parse(filterParamsLocal)
        : {};

      const filterParsms = {
        category: filterParams.category,
        minYear: filterParams.minYear,
        maxYear: filterParams.maxYear,
        page: this.page,
        ganreFilme: filterParams.ganreFilme,
        ganreTv: filterParams.ganreTv,
      };

      localStorage.setItem('filterParams', JSON.stringify(filterParsms));

      if (filterParsms.page > this.maxNumberPage) {

        const filterParsms = {
          category: filterParams.category,
          minYear: filterParams.minYear,
          maxYear: filterParams.maxYear,
          page: this.maxNumberPage,
          ganreFilme: filterParams.ganreFilme,
          ganreTv: filterParams.ganreTv,
        };

        localStorage.setItem('filterParams', JSON.stringify(filterParsms));
        this.getFilmsByCategory();
        this.page = this.maxNumberPage;

      } else if (filterParsms.page < 1) {

        const filterParsms = {
          category: filterParams.category,
          minYear: filterParams.minYear,
          maxYear: filterParams.maxYear,
          page: 1,
          ganreFilme: filterParams.ganreFilme,
          ganreTv: filterParams.ganreTv,
        };

        localStorage.setItem('filterParams', JSON.stringify(filterParsms));
        this.getFilmsByCategory();
        this.page = 1;

      } else {

        this.getFilmsByCategory();
        this.errorMessage = '';

      }

    }

    this.enterPageNumber = 1;

  }

  // Фільтрування

  FilterByCategory(): void {

    let myApi = this.api;
    const apiKey = `?api_key=43bf190d6bcf679c19972989b9cb1774`;

    if (typeof window !== 'undefined' && window.localStorage) {

      const filterParamsLocal = localStorage.getItem('filterParams');

      const filterParams = filterParamsLocal
        ? JSON.parse(filterParamsLocal)
        : {};

      if (filterParams.category) {

        myApi = myApi + `discover/${filterParams.category}`;

      } else {

        myApi = myApi;

      }

      myApi = myApi + apiKey + `&page=${filterParams.page}`;

      if (filterParams.category == 'movie' && filterParams.ganreFilme) {

        myApi = myApi + `&with_genres=${filterParams.ganreFilme}`;

      }

      if (filterParams.category == 'tv' && filterParams.ganreTv) {

        myApi = myApi + `&with_genres=${filterParams.ganreTv}`;

      }

      if (
        filterParams.minYear == filterParams.maxYear &&
        filterParams.category == 'movie'
      ) {

        myApi = myApi + `&primary_release_year=${filterParams.minYear}`;

      } else if (
        filterParams.minYear !== filterParams.maxYear &&
        filterParams.category == 'movie'
      ) {

        myApi =
          myApi +
          `&primary_release_date.gte=${filterParams.minYear}-01-01&primary_release_date.lte=${filterParams.maxYear}-12-31`;

      }

      if (
        filterParams.minYear == filterParams.maxYear &&
        filterParams.category == 'tv'
      ) {

        myApi = myApi + `&first_air_date_year=${filterParams.minYear}`;

      } else if (
        filterParams.minYear !== filterParams.maxYear &&
        filterParams.category == 'tv'
      ) {

        myApi =
          myApi +
          `&first_air_date.gte=${filterParams.minYear}-01-01&first_air_date.lte=${filterParams.maxYear}-12-31`;

      }

      if (filterParams.category) {

        this.searchService.searchParams(myApi);

      } else {

        this.errorMessage = 'Please select a category';

        setTimeout(() => {
          this.errorMessage = this.errorMessage.replace(
            'Please select a category',
            ''
          );
        }, 2800);

      }

    }

  }

  // Отрмання id фільму для отримання докладної інформації

  getFilmId(id: number): void {
    
    if (typeof window !== 'undefined' && window.localStorage) {

      const filterParamsLocal = localStorage.getItem('filterParams');

      const filterParams = filterParamsLocal
        ? JSON.parse(filterParamsLocal)
        : {};

      let API;

      if (filterParams.category == 'movie') {

        API = `${this.api}movie/${id}/external_ids?api_key=43bf190d6bcf679c19972989b9cb1774`;

      } else {

        API = `${this.api}tv/${id}/external_ids?api_key=43bf190d6bcf679c19972989b9cb1774`;

      }

      let FilmId;

      this.filmsServiсe.getAll(API).subscribe((data) => {

        FilmId = data.imdb_id;
        this.router.navigate(['Information', FilmId]);

      });

    }

  }

  // Додавання фільму в збережені та відправка інформації на базу данних

  sendInfo(filmPoster: string,
    filmTitle: string,
    filmType: string,
    filmYear: string,
    filmId: string) {

      if (this.userLoadded == 'true') {
        let API;
      let FilmId;

      if (filmType == 'movie') {

        API = `${this.api}movie/${filmId}/external_ids?api_key=43bf190d6bcf679c19972989b9cb1774`;

      } else {

        API = `${this.api}tv/${filmId}/external_ids?api_key=43bf190d6bcf679c19972989b9cb1774`;

      }

      this.filmsServiсe.getAll(API).subscribe((data) => {

        FilmId = data.imdb_id;
        
        const filmSaveInfo = {
          poster: filmPoster,
          title: filmTitle,
          type: filmType,
          year: filmYear,
          id: FilmId,
        };
  
        this.addToSavedService.sendInfo(filmSaveInfo);

      })
      } else {

        this.errorMessage = `To save the movie you need to log in to your account.`;
  
      setTimeout(() => {
        this.errorMessage = '';
      }, 2800);

      }

  }
  
}
