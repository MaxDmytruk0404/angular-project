import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AddToSavedService } from '../../../service/add-to-saved/add-to-saved.service';
import { CheckUserLoggedService } from '../../../service/check-user-logged/check-user-logged.service';
import { MessageService } from '../../../service/message/message.service';

@Component({
  selector: 'app-home-film-poster',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home-film-poster.component.html',
  styleUrl: './home-film-poster.component.css'
})
export class HomeFilmPosterComponent {

  filmHeaderInfo: any = {
    name: 'Deadpool & Wolverine',
    bg: 'assets/Deadpool_&_Wolverine_bg.webp',
    img: 'assets/Deadpool_&_Wolverine.webp',
    id: 'tt6263850',
    type: 'movie',
    year: '2024',
  };

  constructor(private addToSavedService: AddToSavedService, 
              private checkUserLoggedService: CheckUserLoggedService,
              private messageService: MessageService
             ) {}

  // Додавання фільму в збереженні

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
