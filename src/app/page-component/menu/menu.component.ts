import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UpdateMenuStatusService } from '../../service/update-menu-status/update-menu-status.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  userInfo: any; // Інформація про користувача
  
  constructor(private auth: AuthService, private updateMenuStatusService: UpdateMenuStatusService, private router: Router) {}

  ngOnInit(): void {
    

    if (typeof window !== 'undefined' && window.localStorage) {

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
  }

  // Вихід з акаунта

  logout() {

    this.auth.logOut();

  }

  // Навігація

  navigate(url: string) {
    this.updateMenuStatusService.setMenuStatus(false);
    this.router.navigate([url])
  }
  
}
