import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateSavedStatusService {

  private savedSubject = new BehaviorSubject<string>('');
  savedStaus$ = this.savedSubject.asObservable();

  constructor() { }

  setSavedStatus(status: string) {
    this.savedSubject.next(status);
  }

  resetSavedStatus() {
    this.savedSubject.next('');
  }

}
