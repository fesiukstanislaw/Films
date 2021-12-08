import {Component, Input, OnInit} from '@angular/core';
import {Films} from '../../../backend';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() posts: Films[];

  constructor() { }

  ngOnInit(): void {
  }

}
