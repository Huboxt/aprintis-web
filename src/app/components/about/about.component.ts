import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  assetsUrl = environment.assetsUrl;
  topImage = `${this.assetsUrl}/images/new-design/about-main.png`;
  windowWidth = window.innerWidth;

  constructor() {}

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = window.innerWidth;
  }
}
