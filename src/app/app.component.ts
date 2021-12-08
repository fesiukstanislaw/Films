import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Films} from '../../backend';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'films';
  currentPage = 0;
  lastPage = 0;

  arr: Films[] = [];

  options = ['Name', 'Year'];

  selectedOption: any = this.options[0];

  filterOptions = [];

  selectedFilterOption: any;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void{

    this.route.queryParams.subscribe(params => this.loadPage(params.page || 0));
    this.route.queryParams.subscribe(params => this.currentPage = params.page || 0);
  }

  ngOnDestroy(): void{
  }


  loadPage(page: number, sort: boolean = false, sortBy: string = '', filterBy: string = ''): void{
    this.arr = [];
    let url = `http://localhost:4201/api/films/${page}`;
    if (sort === true){
      url = `http://localhost:4201/api/films/sort/${sortBy}/filter/${filterBy}`;
    }
    console.log(url);
    this.httpClient.get<any>(`${url}`).subscribe(data => {
      this.lastPage = data.length;
      data.films.forEach( el => {
        this.filterOptions.push( el.genre1);
        this.filterOptions.push( el.genre2);
        this.arr.push({
            id: el.id,
            name: el.name,
            genre1: el.genre1,
            genre2: el.genre2,
            year: el.year
          });
      });
      this.filterOptions.unshift('none');
      this.filterOptions = [...new Set(this.filterOptions)];
      this.selectedFilterOption = this.filterOptions[0];
    });
  }

  apply(){
    this.loadPage(0, true, this.selectedOption, this.selectedFilterOption);
  }
}
