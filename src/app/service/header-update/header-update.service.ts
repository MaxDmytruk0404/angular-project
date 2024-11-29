import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderUpdateService {

  private loggedInSubject = new BehaviorSubject<string>(this.isLoggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor() { }

  isLoggedIn(): string{

    let loadded = 'false';

    if (typeof window !== 'undefined' && window.localStorage) {
      loadded = localStorage.getItem('logged') || 'false'
    }

    return loadded;
  }

  setLoginStatus(status: string) {
    localStorage.setItem('logged', status);
    this.loggedInSubject.next(status);
  }

}
