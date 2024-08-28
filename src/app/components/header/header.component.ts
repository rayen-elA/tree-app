import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = 'My First Angular App';
  subtitle: string = 'This is a subtitle';

  constructor() { }
  ngOnInit(): void {
  }
  changeTitle(): void {
    this.title = 'Title Changed';
  }
  changeSubtitle(): void {
    this.subtitle = 'Subtitle Changed';
  }
  reset(): void {
    this.title = 'My First Angular App';
    this.subtitle = 'This is a subtitle';
  }
  changeTitleAndSubtitle(): void {
    this.title = 'Title Changed';
    this.subtitle = 'Subtitle Changed';
  }
  
  

}
