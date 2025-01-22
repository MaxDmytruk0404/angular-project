import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { HomeFilterComponent } from '../../page-component/home-filter/home-filter.component';
import { HomeFilmPosterComponent } from '../../ui/home/home-film-poster/home-film-poster.component';
import { HomeSliderBest2024Component } from '../../ui/home/home-slider-best-2024/home-slider-best-2024.component';
import { HomeSliderRecomendComponent } from '../../ui/home/home-slider-recomend/home-slider-recomend.component';
import { SearchComponent } from '../../ui/home/search/search.component';

import { SearchService } from '../../service/search/search.service';
import { MessageService } from '../../service/message/message.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SlickCarouselModule,
    RouterLink,
    SearchComponent,
    FormsModule,
    HomeFilterComponent,
    HomeFilmPosterComponent,
    HomeSliderBest2024Component,
    HomeSliderRecomendComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  
  errorMessage: string = ''; // Повідомлення про помилку
  message: string = ''; // Повідомлення для користувача
  userLoadded: string = 'false'; // Лоадер

  constructor(
    private searchService: SearchService, 
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

    this.searchService.filterVisibel(false);

    // registration complite message

    if (typeof window !== 'undefined' && window.localStorage) {

      const localMessage = localStorage.getItem('message') || '';

      if (localMessage !== '') {

        this.message = localMessage;

        setTimeout(() => {
          this.message = this.message.replace(localMessage, '');
        }, 2800);

        localStorage.setItem('message', '');

      }
    }
  }

}
