import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';

import { FilmInfoService } from '../../../service/film-info/film-info.service';
import { DataOperationService } from '../../../service/dataOperation/data-operation.service';



@Component({
  selector: 'app-button-add-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-add-list.component.html',
  styleUrl: './button-add-list.component.css'
})
export class ButtonAddListComponent implements OnInit {

  userLocalInfo: any; // Інформація про користувача з localStarage
  userStorageInfo: any; // Інформація про користувача з бази даних

  filmId: string = ''; // Айді фільму
  filmInfo: any; // Усі данні про фільм

  listDisplay: boolean = false; // Відображує блок з переіком доступник списків при true
  myLists: any = []; // Масив з саписками

  userLoadded: string = 'false'; // Вказує чи увішов користувач в акаунт

  constructor(
      private route: ActivatedRoute,
      private FilmInfoService: FilmInfoService,
      private dataOperationService: DataOperationService,
      private meta: Meta,
    ) { }

  ngOnInit(): void {


    this.route.paramMap.subscribe((params) => {

      this.filmId = params.get('id') ?? '';

    });

    this.getInfo() 
    this.getFilmInfo();

  }



  // Отримання інформації з бази даних 

  getInfo() {

    if (typeof window !== 'undefined' && window.localStorage) {

      this.userLoadded = localStorage.getItem('logged') || '';

     if (this.userLoadded == 'true') {

      let localInfo = localStorage.getItem('userInfo') || '';
      this.userLocalInfo = JSON.parse(localInfo);

      this.dataOperationService.getUserInfo(this.userLocalInfo.email).subscribe( response => {

        if (response) {
  
          this.userStorageInfo = response.exists;
          
          for (let list of this.userStorageInfo.lists) {

            let foundList = {
              listName: list.listName,
              filmFound: false
            }

            for (let film of list.listFilms) {

              if (film.id == this.filmId) {
                foundList.filmFound = true;
                this.myLists.push(foundList);
                
                return

              }

            }

            if (foundList.filmFound == false) {
              this.myLists.push(foundList);
            }
            
          }
  
        }
  
      })

     }

    }
  }

  // Отримання інформації про фільмів

  getFilmInfo(): void {

    this.FilmInfoService.getFilmInfo(this.filmId).subscribe((data) => {

      this.filmInfo = data;
      this.meta.updateTag({ name: 'description', content: `${this.filmInfo.Plot}` });

    });

  }

   // Відривання та закривання списків

   handleList(): void {

    this.listDisplay = !this.listDisplay;

  }

 // Додавання в список
 
 addInList(listInfo: any):void {

  const listTitle = {
    poster: this.filmInfo.Poster,
    title: this.filmInfo.Title,
    type: this.filmInfo.Type,
    year: this.filmInfo.Year,
    id: this.filmInfo.imdbID,
  }

  for (let listStorage of this.userStorageInfo.lists) {

    if (listStorage.listName == listInfo.listName) {

      listStorage.listFilms.push(listTitle);
      this.dataOperationService.updateData(this.userLocalInfo.email,this.userStorageInfo).subscribe((response) => {});

    }

    for (let list of this.myLists) {

      if (list.listName == listInfo.listName) {

        list.filmFound = true;

      }

    }

  }

 }

 // Видалення зі списку  
 removeInList(listInfo: any):void {

  for (let listStorage of this.userStorageInfo.lists) {

    if (listStorage.listName == listInfo.listName) {

      listStorage.listFilms = listStorage.listFilms.filter((list: { id: any; }) => list.id !== this.filmId);
      this.dataOperationService.updateData(this.userLocalInfo.email,this.userStorageInfo).subscribe((response) => {});

    }

    for (let list of this.myLists) {

      if (list.listName == listInfo.listName) {

        list.filmFound = false;

      }

    }

  }

 }

}
