import { Component } from '@angular/core';
import { IPost } from './shared/ipost';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontendpost';
  posts: IPost[] = [];

  getSentPost(recievedPost: IPost) {
    this.posts.push(recievedPost);
  }
}
