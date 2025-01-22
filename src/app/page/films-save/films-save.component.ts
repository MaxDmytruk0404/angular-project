import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuComponent } from '../../page-component/menu/menu.component';
import { DataOperationService } from '../../service/dataOperation/data-operation.service';

interface Film {
  id: string,
  poster: string,
  title: string,
  type: string,
  year: string,
}

@Component({
  selector: 'app-films-save',
  standalone: true,
  imports: [RouterLink, CommonModule, MenuComponent],
  templateUrl: './films-save.component.html',
  styleUrl: './films-save.component.css',
})

export class FilmsSaveComponent implements OnInit {
  
  filmSave: any[] = []; // Масив з збереженими фільмами
  loadding: boolean = true; // Лоадер

  constructor(private dataOperationService: DataOperationService) {}

  ngOnInit(): void {

    this.getFilmSave();

  }

  // Отримання фільмів

  getFilmSave() {

    this.loadding = true
    
    if (typeof localStorage !== 'undefined') {

      const local = localStorage.getItem('userInfo') || '';
      const userLocal = JSON.parse(local);

      this.dataOperationService.getUserInfo(userLocal.email).subscribe( response => {

        if (response) {

          let userStorageInfo = response;
          this.filmSave = userStorageInfo.exists.saved;

          this.loadding = false;

        }

      })

    }

  }

  // Видалення фільмів

  removeFilm(filmId: string) {

    this.loadding = true;

    if (typeof localStorage !== 'undefined') {

      const local = localStorage.getItem('userInfo') || '';
      const userLocal = JSON.parse(local);

      this.dataOperationService.getUserInfo(userLocal.email).subscribe( response => {

        if (response) {

          let userStorageInfo = response;
          const savedFilms = userStorageInfo.exists.saved as Film[];

          userStorageInfo.exists.saved = savedFilms.filter((film: Film) => film.id !== filmId);

          this.dataOperationService.updateData(userStorageInfo.exists.email, userStorageInfo.exists).subscribe((response) => {})
          this.filmSave = userStorageInfo.exists.saved;

          this.loadding = false;

        } else {
          this.loadding = false;
        }

      });

    }

  }

}
