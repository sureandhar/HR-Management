import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-notfound',
  templateUrl: './page-notfound.component.html',
  styleUrls: ['./page-notfound.component.css'],
})
export class PageNotfoundComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Page not found');
  }

  ngOnInit(): void {}
}
