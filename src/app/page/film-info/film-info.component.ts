import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YouTubePlayer } from '@angular/youtube-player';
import { DomSanitizer} from '@angular/platform-browser';

import { StarRatingComponent } from '../../page-component/star-rating/star-rating.component';
import { ComentariesComponent } from '../../page-component/comentaries/comentaries.component';

import { FilmInfoService } from '../../service/film-info/film-info.service';
import { DataOperationService } from '../../service/dataOperation/data-operation.service';


@Component({
  selector: 'app-film-info',
  standalone: true,
  imports: [CommonModule, YouTubePlayerModule, YouTubePlayer, StarRatingComponent, ComentariesComponent],
  templateUrl: './film-info.component.html',
  styleUrl: './film-info.component.css',
})

export class FilmInfoComponent implements OnInit {

  userLocalInfo: any;
  userStorageInfo: any;
  filmId: string = '';
  filmInfo: any;
  trelerUrl: any;
  raiting: number = 0;
  listDisplay: boolean = false;
  myLists: any = [];
  loadding: boolean = false;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private FilmInfoService: FilmInfoService,
    private sanitizer: DomSanitizer,
    private dataOperationService: DataOperationService,
  ) { }
  

  ngOnInit(): void {

    this.loadding = true;

    this.route.paramMap.subscribe((params) => {

      this.filmId = params.get('id') ?? '';

    });

    this.getInfo() 
    this.getFilmTriler();
    this.getFilmInfo();

    this.loadding = false;
  }

  // Отримання локальнії інформації 

  getInfo() {

    if (typeof window !== 'undefined' && window.localStorage) {

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

  // Отримання інформації про фільмів

  getFilmInfo(): void {

    this.FilmInfoService.getFilmInfo(this.filmId).subscribe((data) => {

      this.filmInfo = data;

    });

  }

  // Отримання трейлеру фільму

  getFilmTriler() {

    const imdbID = this.filmId;
    const apiKey = '43bf190d6bcf679c19972989b9cb1774';
    let api = `https://api.themoviedb.org/3/movie/${imdbID}/videos?api_key=${apiKey}`;

    fetch(api)
      .then((response) => response.json())
      .then((data) => {

        let trailers;

        if(data.results) {

          trailers = data.results.filter((video: { type: string; }) => video.type === 'Trailer');

        } else {

          trailers = '';

        }

        if(trailers) {

          this.trelerUrl =  trailers[0].key;
          this.trelerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.trelerUrl}`);

        } else {

          this.trelerUrl ='';

        }

      })
      .catch((error) => console.error('Error:', error));

  }

  // Для оцінювання зріками

  Handle(event: number): void {
    
    this.message = `Thank you for your ${event} star rating`;
    this.raiting = event;
    

    setTimeout(() => {
      this.message = this.message.replace(this.message, '');
    }, 2800);
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
