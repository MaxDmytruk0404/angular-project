import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MenuComponent } from '../../page-component/menu/menu.component';
import { DataOperationService } from '../../service/dataOperation/data-operation.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MenuComponent, MatInputModule, FormsModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  loadding = false;
  userStorageInfo: any;
  userLocalInfo: any;
  myLists: any[] = [];
  listFormClass:string = 'w-full flex gap-3 hidden';
  listName: string = '';
  errorMessage = '';
  screenWidth: number = 0;
  sline: number = 5;

  constructor (private dataOperationService:DataOperationService, private router: Router) {}

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

  ngOnInit():void {

    if (typeof window !== 'undefined') {

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
      

    }

    this.getList();
  }

  // Отримання інформації про Lists
  getList():void {
    this.loadding = true
    if (typeof localStorage !== 'undefined') {

      const local = localStorage.getItem('userInfo') || '';
      this.userLocalInfo = JSON.parse(local);

      this.dataOperationService.getUserInfo(this.userLocalInfo.email).subscribe( response => {
        if (response) {

          this.userStorageInfo = response.exists;

          if (this.userStorageInfo.lists && this.userStorageInfo.lists.length !== 0) {

            this.myLists = this.userStorageInfo.lists;
            this.loadding = false;

          } else {

            this.myLists = [];
            this.loadding = false;

          }


        }
      })

    }
  }

  // Відображення форми для задання ім'я для нового List

  showListForm():void {
    this.listFormClass = 'flex gap-3 animate-slide-in'
  }

  // Створення List

  createList():void {

    this.listFormClass = 'w-full flex gap-3 animate-slide-out';

    const newList = {
      listName: this.listName,
      listFilms: []
    }

    if (this.userStorageInfo.lists) {

      let listNameExists = false;

      for (let list of this.userStorageInfo.lists) {

        if (list.listName == newList.listName) {

          this.errorMessage = 'A list with that name already exists';
          listNameExists = true;
          this.listName = '';

          setTimeout(() => {

            this.errorMessage = this.errorMessage.replace(
              'A list with that name already exists',
              ''
            );
            this.listFormClass = 'w-full flex gap-3 hidden';

          }, 400);

          return;
          
        }

      }

      if (listNameExists == false) {
        this.userStorageInfo.lists.push(newList);
        console.log(this.userStorageInfo)
        this.dataOperationService.updateData(this.userLocalInfo.email, this.userStorageInfo).subscribe((response) => {});
      }
    } else {
      this.userStorageInfo.lists = [
        {
          listName: this.listName,
          listFilms: [],
        },
      ];
      console.log(this.userStorageInfo);
      this.dataOperationService
        .updateData(this.userLocalInfo.email, this.userStorageInfo)
        .subscribe((response) => {});
    }

    this.myLists.push(newList);

    this.listName = ''
    setTimeout(() => {
      this.listFormClass = 'w-full flex gap-3 hidden';
    }, 400);

  }

  // Видалення списку
  deleteList(listName:string):void {

    for (let list of this.userStorageInfo.lists) {
      if(list.listName == listName) {
        this.userStorageInfo.lists = this.userStorageInfo.lists.filter((thisList: { listName: string; }) => thisList.listName !== listName);
        this.myLists = this.userStorageInfo.lists;
        this.dataOperationService.updateData(this.userLocalInfo.email, this.userStorageInfo).subscribe((response) => {});
      }
    }
  }

  // Навігація на детальну інформацію про фільм
  navigate(filmId: any) {
    this.router.navigate(['/Information', filmId]);
  }

}
