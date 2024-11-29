import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuStatusService {
  private menuSubject = new BehaviorSubject<boolean>(false);
  menuStatus$ = this.menuSubject.asObservable();

  constructor() { }

  setMenuStatus(status: boolean) {
    this.menuSubject.next(status)
  }
}
