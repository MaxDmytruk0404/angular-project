import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private message = new BehaviorSubject<string>('');
  messageStaus$ = this.message.asObservable();

  private errorMessage = new BehaviorSubject<string>('');
  errorMessageStaus$ = this.errorMessage.asObservable();
  
    constructor() { }
  
    setMesageStatus(status: string) {
      this.message.next(status);
    }
  
    resetMessageStatus() {
      this.message.next('');
    }

    setErrorMesageStatus(status: string) {
      this.errorMessage.next(status);
    }
  
    resetErrorMessageStatus() {
      this.errorMessage.next('');
    }
  
}
