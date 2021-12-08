import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() lastPage: number;

  constructor() { }

  ngOnInit(): void {
  }

  convertToInt(val){
    return parseInt(val, 10);
  }


}
