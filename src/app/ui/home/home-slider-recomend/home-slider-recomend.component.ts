import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AddToSavedService } from '../../../service/add-to-saved/add-to-saved.service';
import { CheckUserLoggedService } from '../../../service/check-user-logged/check-user-logged.service';
import { MessageService } from '../../../service/message/message.service';

@Component({
  selector: 'app-home-slider-recomend',
  standalone: true,
  imports: [CommonModule, RouterLink, SlickCarouselModule],
  templateUrl: './home-slider-recomend.component.html',
  styleUrl: './home-slider-recomend.component.css'
})
export class HomeSliderRecomendComponent {

  slidesRecomend: any = [
    {
      name: 'Avengers: Infinity War',
      img: 'assets/Avengers_Infinity_War.webp',
      id: 'tt4154756',
      type: 'movie',
      year: '2018',
    },
    {
      name: 'Fallout',
      img: 'assets/Fallout.webp',
      id: 'tt12637874',
      type: 'series',
      year: '2024-',
    },
    {
      name: 'Godzilla x Kong: The New Empire',
      img: 'assets/Godzilla_x_Kong_The_New_Empire.webp',
      id: 'tt14539740',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'The Boys',
      img: 'assets/The_Boys.webp',
      id: 'tt1190634',
      type: 'series',
      year: '2019-',
    },
    {
      name: 'The Mandalorian',
      img: 'assets/The_Mandalorian.webp',
      id: 'tt8111088',
      type: 'series',
      year: '2019-',
    },
    {
      name: 'Gladiator',
      img: 'assets/Gladiator.webp',
      id: 'tt0172495',
      type: 'movie',
      year: '2000',
    },
    {
      name: 'Dune: Part Two',
      img: 'assets/Dune_Part_Two.webp',
      id: 'tt15239678',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'The Grand Tour',
      img: 'assets/The_Grand_Tour.webp',
      id: 'tt5712554',
      type: 'series',
      year: '2016-2024',
    },
    {
      name: 'Alien: Romulus',
      img: 'assets/Alien_Romulus.webp',
      id: 'tt18412256',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Deadpool & Wolverine',
      img: 'assets/Deadpool_&_Wolverine.webp',
      id: 'tt6263850',
      type: 'movie',
      year: '2024',
    },
  ];

  // Конфігурація слайдера

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  constructor(private addToSavedService: AddToSavedService, 
                  private checkUserLoggedService: CheckUserLoggedService,
                 private messageService: MessageService) {}
  
    sendFilmInfo(film: any) {
  
      let userLoadded = this.checkUserLoggedService.checkLogged();
  
      if (userLoadded == "true") {
  
        const filmSaveInfo = {
          poster: film.img,
          title: film.name,
          type: film.type,
          year: film.year,
          id: film.id,
        };
        
        this.addToSavedService.sendInfo(filmSaveInfo);
  
      } else {
  
        this.messageService.setErrorMesageStatus('To save the movie you need to log in to your account.');

      setTimeout(() => {
        this.messageService.resetErrorMessageStatus()
      }, 2800);
        
      }
  
    }
  


}
