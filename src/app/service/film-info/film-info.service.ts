import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmInfoService {

  private apiKey = 'aae28dc3';
  constructor(private http: HttpClient) {}

  // Формує URL для Imdb
  getFilmInfo(filmId: string):Observable<any>{
    return this.http.get(`https://www.omdbapi.com/?i=${filmId}&apikey=${this.apiKey}`)
  }
  
  // Формує URL для Tmdb
  getTmdbInfo(filmId: string):Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/find/${filmId}?api_key=43bf190d6bcf679c19972989b9cb1774&external_source=imdb_id`)
  }

  getTmdbInfoByCategory(filmId: string, type: string):Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/${type}/${filmId}/videos?api_key=43bf190d6bcf679c19972989b9cb1774`)
  }

}
