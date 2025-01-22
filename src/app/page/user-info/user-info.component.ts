import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../page-component/menu/menu.component';
import { DataOperationService } from '../../service/dataOperation/data-operation.service';
import { Router, RouterLink } from '@angular/router';
import { error } from 'node:console';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, MenuComponent, RouterLink],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})

export class UserInfoComponent implements OnInit {

  comonUserImg: string = 'assets/user-img.webp'; // Картинка користувача якщо вхід відбувся не через gmail
  userName: string = ''; // Ім'я користувача

  loadding: boolean = false; // Лоадер
  filmSave: any[] = []; // Збережені фільми
  sline: number = 5; // Кількість фільмів що відображатиметься в збережені
  screenWidth: any; // Ширина екрану користувача

  userInfo: any = {
    email: '',
    name: '',
    img: '',
  }; // Інформація про користувача

  constructor(private auth: AuthService, private dataOperationService: DataOperationService, private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;

    if (this.screenWidth >= 1150) {
      this.sline = 5
    } else if (this.screenWidth < 1150 && this.screenWidth > 1024) {
      this.sline = 4
    } else if (this.screenWidth < 1024 && this.screenWidth > 768) {
      this.sline = 3
    } else if (this.screenWidth < 768 && this.screenWidth > 680) {
      this.sline = 4
    } else if (this.screenWidth < 680 && this.screenWidth > 500) {
      this.sline = 3
    } else if (this.screenWidth < 500 && this.screenWidth > 300) {
      this.sline = 2
    } else if (this.screenWidth < 300) {
      this.sline = 1
    }

  
  }

  ngOnInit(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

        this.screenWidth = window.innerWidth;
  
        if (this.screenWidth >= 1150) {
          this.sline = 5
        } else if (this.screenWidth < 1150 && this.screenWidth > 1024) {
          this.sline = 4
        } else if (this.screenWidth < 1024 && this.screenWidth > 768) {
          this.sline = 3
        } else if (this.screenWidth < 768 && this.screenWidth > 680) {
          this.sline = 4
        } else if (this.screenWidth < 680 && this.screenWidth > 500) {
          this.sline = 3
        } else if (this.screenWidth < 500 && this.screenWidth > 300) {
          this.sline = 2
        } else if (this.screenWidth < 300) {
          this.sline = 1
        }
  
      const userInfoLocal = localStorage.getItem('userInfo') || '';
      let user = JSON.parse(userInfoLocal)

      if (user !== '') {

        this.userInfo = {
          email: user.email,
          name: user.name,
          img: user.img,
        };

      }

    }

    this.getFilmSave();

  }

  // Отрмання інформації про збережені фільми
  getFilmSave() {

    this.loadding = true
    
    if (typeof localStorage !== 'undefined') {

      const local = localStorage.getItem('userInfo') || '';
      const userLocal = JSON.parse(local);

      this.dataOperationService.getUserInfo(userLocal.email).subscribe(
        response => {
          if (response) {
            let userStorageInfo = response;
            this.filmSave = userStorageInfo.exists.saved;
            this.loadding = false;
          } else {
            this.loadding = false;
          }
        },
        error => {
          this.loadding = false;
        }
      );

    }

  }

  // Навігація на сторінку з детальною інформацією
  navigate(filmId: any) {
    this.router.navigate(['/Information', filmId]);
  }

}
