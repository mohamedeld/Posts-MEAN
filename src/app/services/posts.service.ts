import { Injectable } from '@angular/core';
import { IPost } from '../shared/ipost';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: IPost[] = [];
  changedPosts = new Subject<IPost[]>();
  constructor(private http: HttpClient) {}
  getPosts() {
    this.http
      .get<{ message: string; posts: IPost[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((data) => {
        this.posts = data.posts;
        this.changedPosts.next(this.posts.slice());
      });
  }
  getPostsUpdated() {
    return this.changedPosts.asObservable();
  }
  addPost(post: IPost) {
    this.posts.push(post);
    this.changedPosts.next(this.posts.slice());
  }
}
