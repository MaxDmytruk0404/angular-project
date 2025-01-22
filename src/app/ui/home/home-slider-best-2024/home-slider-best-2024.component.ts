import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AddToSavedService } from '../../../service/add-to-saved/add-to-saved.service';
import { CheckUserLoggedService } from '../../../service/check-user-logged/check-user-logged.service';
import { MessageService } from '../../../service/message/message.service';

@Component({
  selector: 'app-home-slider-best-2024',
  standalone: true,
  imports: [CommonModule, RouterLink, SlickCarouselModule],
  templateUrl: './home-slider-best-2024.component.html',
  styleUrl: './home-slider-best-2024.component.css'
})
export class HomeSliderBest2024Component {

  // Інформація про фільми для слайдера з найкращими фільмами у 2024 році

  slidesBestIn2024: any = [
    {
      name: 'Inside Out 2',
      img: 'assets/Inside_Out_2.webp',
      id: 'tt22022452',
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
    {
      name: 'Despicable Me 4',
      img: 'assets/Despicable_Me_4.webp',
      id: 'tt7510222',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Dune: Part Two',
      img: 'assets/Dune_Part_Two.webp',
      id: 'tt15239678',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Godzilla x Kong: The New Empire',
      img: 'assets/Godzilla_x_Kong_The_New_Empire.webp',
      id: 'tt14539740',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Kung Fu Panda 4',
      img: 'assets/Kung_Fu_Panda_4.webp',
      id: 'tt21692408',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Bad Boys: Ride or Die',
      img: 'assets/Bad_Boys_Ride_or_Die.webp',
      id: 'tt4919268',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Kingdom of the Planet of the Apes',
      img: 'assets/Kingdom_of_the_Planet_of_the_Apes.webp',
      id: 'tt11389872',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Twisters',
      img: 'assets/Twisters.webp',
      id: 'tt12584954',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Alien: Romulus',
      img: 'assets/Alien_Romulus.webp',
      id: 'tt18412256',
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
                private messageService: MessageService
              ) {}

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
