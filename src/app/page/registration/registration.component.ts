import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatInputModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})

export class RegistrationComponent implements OnInit{

  validateMassage: string = ''; // Повідомлення про невірно заповненну форму
  errorMessage: string = ''; // Повідомлення про помилку

  email: string = ''; // Введений користувачем email
  password: string = '';  // Введений користувачем пароль

  constructor(private auth: AuthService) {}

 ngOnInit(): void {
   
  if (typeof window !== 'undefined' && window.localStorage) {

    const localError = localStorage.getItem('errorMessage') || '';
    this.errorMessage = localError;
    setTimeout(() => {
      this.errorMessage = this.errorMessage.replace(localError, '');
    }, 2800);
    localStorage.setItem('errorMessage', '')
  }

 }

//  Реєстрація

 registration() {

  if (this.email == '') {

    this.validateMassage = 'Please enter Email';

    return

  } else if (!this.email.includes('@gmail.com')) {

    this.validateMassage = 'Field must contain @gmail.com';

    return

  } else {

    this.validateMassage = '';

  }

  if (this.password == '') {
    
    this.validateMassage = 'Please enter Password';

    return

  } else if (this.password.length < 6) {

    this.validateMassage = 'The field must contain more than 6 characters';

    return

  } else {
    this.validateMassage = '';
  }

  if (this.validateMassage == '') {

    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';

  }

}

}
