import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckUserLoggedService {

  constructor() { }

  checkLogged() {

    if (typeof window !== 'undefined' && window.localStorage) { 

      let userLodded = localStorage.getItem('logged') || 'false';

      return userLodded

    } else {

      return 'false'

    }

  }

}
