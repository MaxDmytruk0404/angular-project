import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SearchService } from '../../service/search/search.service';
import { Subscription } from 'rxjs';
import { HeaderUpdateService } from '../../service/header-update/header-update.service';
import { MenuComponent } from '../menu/menu.component';
import { UpdateMenuStatusService } from '../../service/update-menu-status/update-menu-status.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent implements OnInit {

  userInfo: any; // Інформація про користувача
  userFound: string = 'false'; // Вказує чи авторизувався користувач

  colorFon: string = 'night'; // Тема
  menuIsOpen: boolean = false; // Вказує чи відкрите меню

  private subscription: Subscription = new Subscription(); // Відслідковування чи відкрите менню

  constructor(
    private renderer: Renderer2,
    private searchService: SearchService,
    private headerUpadeServise: HeaderUpdateService,
    private updateMenuStatusService: UpdateMenuStatusService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
    
  ) {}

  ngOnInit(): void {

    this.updateMenuStatusService.menuStatus$.subscribe( status => {
      this.menuIsOpen = status;
    })

    this.getUser();
    this.renderer.setAttribute(this.document.body, 'data-theme', this.colorFon);

  }

  // Перевірка на вхід

  getUser(): void {

    this.subscription = this.headerUpadeServise.loggedIn$.subscribe(status => {

      this.userFound = status;

      if (this.userFound == 'true') {

        if (typeof window !== 'undefined' && window.localStorage) {

          const userInfoLocal = localStorage.getItem('userInfo') || '';
          let user = JSON.parse(userInfoLocal);

          if (user !== '') {

            this.userInfo = {
              email: user.email,
              name: user.name,
              img: user.img,
            };

          }

        }
        
      }

    });

  }

  // Світла тема

  getDay() {

    this.colorFon = 'day';
    this.renderer.setAttribute(this.document.body, 'data-theme', this.colorFon);

  }

  // Темна тема

  getNight() {

    this.colorFon = 'night';
    this.renderer.setAttribute(this.document.body, 'data-theme', this.colorFon);

  }

  // Перезапуск сторінки

  reload() {

    document.location.reload()

  }

  // Видимість фільтра

  filterVisibelNone(){

    this.searchService.filterVisibel(false)

  }

  // Відписка

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();  // відписка при знищені компонента
    }
  }


  // Відкриває та закриває меню
  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.updateMenuStatusService.setMenuStatus(!this.menuIsOpen);
  }

  // Закриває меню

  @HostListener('document:click', ['$event'])
  closeMenu (event: Event) {
    this.updateMenuStatusService.setMenuStatus(false);
  }
  
}
