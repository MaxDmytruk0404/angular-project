import { Injectable } from '@angular/core';
import { DataOperationService } from '../dataOperation/data-operation.service';
import { response } from 'express';
import { UpdateSavedStatusService } from '../update-saved-status/update-saved-status.service';

@Injectable({
  providedIn: 'root'
})
export class AddToSavedService {

  massage: string = '';
  errorMassage: string = '';

  constructor( private dataOperationService: DataOperationService, private updateSavedStatusService: UpdateSavedStatusService) { }

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
                  this.updateSavedStatusService.setSavedStatus(`${film.title} already added `);
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

                this.updateSavedStatusService.setSavedStatus(film.title);

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
              this.updateSavedStatusService.setSavedStatus(film.title);

            }
          }
        }
      );

    }

  }
}
