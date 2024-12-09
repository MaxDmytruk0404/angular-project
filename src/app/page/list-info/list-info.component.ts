import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataOperationService } from '../../service/dataOperation/data-operation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-info.component.html',
  styleUrl: './list-info.component.css'
})

export class ListInfoComponent implements OnInit{

  userStorageInfo: any; // Інформація про користувача з бази даних
  userLocalInfo: any; // Інформація про користувача з localStarage

  listName:string = ''; // Назва списку
  myList: any; // Масив з мільмами що є у списку

  loadding: boolean = false; // Лоадер

  constructor(private route: ActivatedRoute, 
              private dataOperationService: DataOperationService, 
              private router: Router) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe( (params) => {
      this.listName = params.get('listName') || '';
    })

    this.getList();

  }

  // Отримання списку з бази даних

  getList():void {

    this.loadding = true

    if (typeof localStorage !== 'undefined') {

      const local = localStorage.getItem('userInfo') || '';
      this.userLocalInfo = JSON.parse(local);

      this.dataOperationService.getUserInfo(this.userLocalInfo.email).subscribe( response => {

        if (response) {

          this.userStorageInfo = response.exists;

          if (this.userStorageInfo.lists && this.userStorageInfo.lists.length !== 0) {

            for (let list of this.userStorageInfo.lists) {

              if (list.listName == this.listName) {
                this.myList = list;
                this.loadding = false;
              }

            }

          } else {

            this.myList = [];
            this.loadding = false;

          }


        }
      })

    }
  }

  // Видалення фільму зі списку

  removeFilm(filmId: string) {

    for(let list of this.userStorageInfo.lists) {

      if(list.listName == this.listName) {

        list.listFilms = list.listFilms.filter( (film: { id: string; }) => film.id !== filmId);
        this.dataOperationService.updateData(this.userLocalInfo.email, this.userStorageInfo).subscribe((response) => {});

      }

    }

  }

  // Навігація на сторінку з докладною інформацією про фільм
  
  navigate(filmId: any) {
    this.router.navigate(['/Information', filmId]);
  }

}


