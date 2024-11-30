import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataOperationService } from '../../service/dataOperation/data-operation.service';

@Component({
  selector: 'app-comentaries',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './comentaries.component.html',
  styleUrl: './comentaries.component.css'
})
export class ComentariesComponent implements OnInit{

  filmId: string = '';
  userLoadded: string = 'false';
  myComentar: string = '';
  userInfo: any;
  comentaries: any = [];

  constructor(private dataOperationService: DataOperationService, private route: ActivatedRoute,) {}

  ngOnInit(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      this.userLoadded = localStorage.getItem('logged') || '';

      if (this.userLoadded == 'true') {

        const userInfoLocal = localStorage.getItem('userInfo') || '';
        this.userInfo = JSON.parse(userInfoLocal);

        if (this.userInfo.img == '') {
          this.userInfo.img = 'assets/user-img.png';
        }

      }

    }

    this.getComentaries();

  }

  getComentaries() {

    this.route.paramMap.subscribe((params) => {

      this.filmId = params.get('id') ?? '';

    });
    
    this.dataOperationService.getComentaries(this.filmId).subscribe((data) => {

      if (data.exists !== null) {

        let allComentaries = data;

        for (let i of allComentaries.exists.comentaries) {

          this.comentaries.push(i);

        }

      }

    });

  }

  sendComentar() {

    this.route.paramMap.subscribe((params) => {

      this.filmId = params.get('id') ?? '';

    });

    this.dataOperationService.getComentaries(this.filmId).subscribe((data) => {

      let allComentaries = data;


      if(allComentaries.exists == null) {

        const time = new Date().toLocaleDateString('en-us', { minute:'numeric', hour:'numeric', day: 'numeric',  month:"numeric", year:"numeric"})


        let newComentaries = 
          {
                comentarId: `${this.filmId}`,
                comentaries: [
                  {
                    userImg: this.userInfo.img,
                    usrName: this.userInfo.name,
                    comentar: `${this.myComentar}`,
                    time: `${time}`
                  }
                ]
          }
        

        this.myComentar = '';
        this.comentaries.push(newComentaries.comentaries[0]);

        this.dataOperationService.sendData(newComentaries).subscribe((response) => {

        });

      } else {

        const time = new Date().toLocaleDateString('en-us', { minute:'numeric', hour:'numeric', day: 'numeric',  month:"numeric", year:"numeric"})

        let newComentaries = {
          userImg: this.userInfo.img,
          usrName: this.userInfo.name,
          comentar: `${this.myComentar}`,
          time: `${time}`
        };

        allComentaries.exists.comentaries.push(newComentaries);
        this.myComentar = '';
        this.comentaries.push(newComentaries);

        this.dataOperationService.sendComentaries(this.filmId, allComentaries.exists).subscribe((response) => {

        });

      }

    });
    
  }

}
