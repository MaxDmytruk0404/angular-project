import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

import { HeaderComponent } from './page-component/header/header.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ProjectAngular';

  constructor(@Inject(PLATFORM_ID) private platfirmId: any) {}

  ngOnInit(): void {

    if (isPlatformBrowser(this.platfirmId)) {

      console.log("Brovers");

    }
    
  }

  
}
