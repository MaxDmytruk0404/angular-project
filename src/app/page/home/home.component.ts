import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterLink } from '@angular/router';
import { SearchComponent } from '../../page-component/search/search.component';
import { FormsModule } from '@angular/forms';
import { HomeFilterComponent } from '../../page-component/home-filter/home-filter.component';
import { SearchService } from '../../service/search/search.service';
import { AddToSavedService } from '../../service/add-to-saved/add-to-saved.service';
import { UpdateSavedStatusService } from '../../service/update-saved-status/update-saved-status.service';
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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  
  errorMessage: string = '';
  message: string = '';
  saveMasive: any[] = [];
  sendFulmInfo: any;
  userLoadded: string = 'false';

  slidesBig: any = [
    {
      name: 'Deadpool & Wolverine',
      bg: 'assets/Deadpool_&_Wolverine_bg.webp',
      img: 'assets/Deadpool_&_Wolverine.webp',
      id: 'tt6263850',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Fallout',
      bg: 'assets/Fallout_bg.webp',
      img: 'assets/Fallout.webp',
      id: 'tt12637874',
      type: 'series',
      year: '2024-',
    },
    {
      name: 'Godzilla x Kong: The New Empire',
      bg: 'assets/Godzilla_x_Kong_The_New_Empire_bg.webp',
      img: 'assets/Godzilla_x_Kong_The_New_Empire.webp',
      id: 'tt14539740',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Dune: Part Two',
      bg: 'assets/Dune_Part_Two_bg.webp',
      img: 'assets/Dune_Part_Two.webp',
      id: 'tt15239678',
      type: 'movie',
      year: '2024',
    },
  ];

  slideBigConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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

  constructor(private searchService: SearchService, private addToSavedService: AddToSavedService, private updateSavedStatusService: UpdateSavedStatusService) {}

  ngOnInit(): void {

    if (typeof window !== 'undefined' && window.localStorage) { 

      this.userLoadded = localStorage.getItem('logged') || 'false';

    }

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

  // Додавання фільму в збереженні

  sendInfo(film: any) {

    if (this.userLoadded == 'true') {

      const filmSaveInfo = {
        poster: film.img,
        title: film.name,
        type: film.type,
        year: film.year,
        id: film.id,
      };
      
      this.addToSavedService.sendInfo(filmSaveInfo);

    } else {

      this.errorMessage = `To save the movie you need to log in to your account.`;
  
      setTimeout(() => {
        this.errorMessage = '';
      }, 2800);
      
    }

  }
}
