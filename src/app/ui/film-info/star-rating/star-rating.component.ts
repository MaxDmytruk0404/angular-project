import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { DataOperationService } from '../../../service/dataOperation/data-operation.service';


@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})

export class StarRatingComponent implements OnInit{

  userLoadded: string = 'false'; // Вказує чи користувач увійщов
  errorMessage: string = ''; // Повідомлення про помилку

  @Input() maxRating = 10; // Максимальна рідкість зірок
  maxRatingArr: any = []; // Масив з зірками
  @Input() SelectedStar = 0; // Вибрана кіькість зірок при наведені
  previousSelection = 0; // Вибрана кіькість зірок
  @Output() onRating: EventEmitter<number> = new EventEmitter<number>(); // Оцінка користувача

  @Input() filmId!: string; // Айді фільма

  constructor(private dataOperationServise: DataOperationService) {}

 ngOnInit(): void {

   this.maxRatingArr = Array(this.maxRating).fill(0);

   if (typeof window !== 'undefined' && window.localStorage) {

    this.userLoadded = localStorage.getItem('logged') || '';
 
    if (this.userLoadded == 'true') {

      this.RaitingCheck();

    }

   }

 }

 // показ жовтих зірок при наведені 

 HandleMouseEnter(index: number) {
  this.SelectedStar = index + 1;
 }

 // зникнення жовтих зірок при відводення мишки від них 

 HandleMouseLeave() {

  if (this.previousSelection!== 0) {
    this.SelectedStar = this.previousSelection;
  } else {
    this.SelectedStar = 0;
  }

 }

 // Оцінка

 Rating(index: number) {
  
  if (this.userLoadded == 'true') {

    this.SelectedStar = index + 1;
    this.previousSelection = this.SelectedStar;
    this.onRating.emit(this.SelectedStar);

    this.addRaitingInServer();

  } else {

    this.errorMessage = 'To rate you need to register'

    setTimeout(() => {
      this.errorMessage = ''
    }, 2800);

  }

 }

  // Перевірка чи оціненений фільм користувачем 

  RaitingCheck() {

    if (typeof window !== 'undefined' && window.localStorage) {

      const userInfoLocal = localStorage.getItem('userInfo') || '';
      let user = JSON.parse(userInfoLocal);

      if (user !== '') {

        let userStarageInfo;

        // Отримання інформації з бази даних
        this.dataOperationServise.getUserInfo(user.email).subscribe((userData) => {
          userStarageInfo = userData;

          // перевірка чи не пустий масиз з оцінками по фільмам
          if (userStarageInfo?.exists?.films?.length) {
            
            for (let film of userStarageInfo?.exists?.films) {

              if (film.filmId == this.filmId) {

                this.previousSelection = film.raiting
                this.SelectedStar = film.raiting

              } 

            }


          } 

        });

      }

    }

  }

  // додання рейтигу в базу даних

  addRaitingInServer() {

    const newRaiting = {
      filmId: this.filmId,
      raiting: this.previousSelection
    }

    if (typeof window !== 'undefined' && window.localStorage) {

      const userInfoLocal = localStorage.getItem('userInfo') || '';
      let user = JSON.parse(userInfoLocal);

      if (user !== '') {

        let userStarageInfo;
        let filmRaitingFound = false;

        // Отримання інформації з бази даних
        this.dataOperationServise.getUserInfo(user.email).subscribe((userData) => {

          userStarageInfo = userData;

          // перевірка чи не пустий масиз з оцінками по фільмам
          if (userStarageInfo?.exists?.films?.length) {
            
            for (let film of userStarageInfo?.exists?.films) {

              if (film.filmId == this.filmId) {

                film.raiting = this.previousSelection;
                filmRaitingFound = true;
                return 

              } 

            }

            if (filmRaitingFound == false) {

              userStarageInfo.exists.films.push(newRaiting);
              
              this.dataOperationServise.updateData(user.email, userStarageInfo.exists).subscribe((response) => {})
              
            } else {
              
              this.dataOperationServise.updateData(user.email, userStarageInfo).subscribe((response) => {})

            }

          } else {

            userStarageInfo.exists.films.push(newRaiting);

            this.dataOperationServise.updateData(user.email, userStarageInfo.exists).subscribe((response) => {})

          }

        });

      }

    }
 
  }

}
