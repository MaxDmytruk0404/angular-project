import { Injectable } from '@angular/core';
import { DataOperationService } from '../dataOperation/data-operation.service';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class AddToSavedService {

  massage: string = '';
  errorMassage: string = '';

  constructor( private dataOperationService: DataOperationService, private messageService: MessageService) { }

  sendInfo(film:any) {

    if (typeof window !== 'undefined' && window.localStorage) {

      let local = localStorage.getItem('userInfo') || '';
      let localUserInfo = JSON.parse(local);

      this.dataOperationService.getUserInfo(localUserInfo.email).subscribe(
        response => {


          if (response) {

            let userStorageInfo = response;

            if (userStorageInfo.exists.saved) {

              let newFilm = true;

              for (let filmSaved of userStorageInfo.exists.saved) {

                if (filmSaved.id == film.id) {

                  newFilm = false;
                  // this.updateSavedStatusService.setSavedStatus(`${film.title} already added `);
                  this.messageService.setErrorMesageStatus(`${film.title} already added `);

                  setTimeout(() => {
                    this.messageService.resetErrorMessageStatus()
                  }, 2800);

                  return

                }
              }

              if (newFilm == true) {

                let filmInfo = {
                  id: film.id,
                  poster: film.poster,
                  title: film.title,
                  type: film.type,
                  year: film.year,
                }
  
                userStorageInfo.exists.saved.push(filmInfo);
                this.dataOperationService.updateData(userStorageInfo.exists.email, userStorageInfo.exists).subscribe((response) => {});

                // this.updateSavedStatusService.setSavedStatus(film.title);
                this.messageService.setMesageStatus(`${film.title} add to Save`);

                setTimeout(() => {
                  this.messageService.resetMessageStatus()
                }, 2800);

              }

            } else {

              userStorageInfo.exists.saved = [
                {
                  id: film.id,
                  poster: film.poster,
                  title: film.title,
                  type: film.type,
                  year: film.year,
                },
              ];
      
              this.dataOperationService.updateData(userStorageInfo.exists.email, userStorageInfo.exists).subscribe((response) => {});
              // this.updateSavedStatusService.setSavedStatus(film.title);
              this.messageService.setMesageStatus(`${film.title} add to Save`);

              setTimeout(() => {
                this.messageService.resetMessageStatus()
              }, 2800);

            }
          }
        }
      );

    }

  }
}
