import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { AddToSavedService } from '../../../service/add-to-saved/add-to-saved.service';
import { MessageService } from '../../../service/message/message.service';

@Component({
  selector: 'app-button-add-to-save',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-add-to-save.component.html',
  styleUrl: './button-add-to-save.component.css'
})
export class ButtonAddToSaveComponent implements OnInit{

  @Input() film!: {Title: string, Type: string, Year: number, Poster: string, imdbID: number}

  userLoadded: string = '';

  constructor(
      private addToSavedService: AddToSavedService,
      private messageService: MessageService,
    ) {}

  ngOnInit(): void {

     if (typeof window !== 'undefined' && window.localStorage) { 

        this.userLoadded = localStorage.getItem('logged') || 'false';

     }
  }

  // Додавання фільму в збережені

  sendInfo() {

    if (this.userLoadded == 'true') {

      const filmSaveInfo = {
        poster: this.film.Poster,
        title: this.film.Title,
        type: this.film.Type,
        year: this.film.Year,
        id: this.film.imdbID,
      };
      
      this.addToSavedService.sendInfo(filmSaveInfo);

    } else {

      this.messageService.setErrorMesageStatus(`To save the movie you need to log in to your account.`);

      setTimeout(() => {
        this.messageService.resetErrorMessageStatus()
      }, 2800);

    }

  }

}
