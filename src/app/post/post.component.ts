import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Films} from '../../../backend';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  id = 0;

  name: string;
  genre: string;
  genre1: string;
  year: string;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void{


    this.route.queryParams.subscribe(params => this.loadPage(params.id));
  }

  loadPage(page: number): void{
    const url = `http://localhost:4201/api/film/${page}`;
    console.log(url);
    this.httpClient.get<any>(`${url}`).subscribe(data => {
      data.forEach( el => {
        this.name = el.name;
        this.genre = el.genre1;
        this.genre1 = el.genre2;
        this.year = el.year;
      });
    });
  }

}
