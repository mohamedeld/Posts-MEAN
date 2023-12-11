import { Injectable } from '@angular/core';
import { IPost } from '../shared/ipost';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: IPost[] = [];
  changedPosts = new Subject<IPost[]>();
  constructor(private http: HttpClient, private router: Router) {}
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
  getPostById(id: string) {
    return this.http.get<{ message: string; post: IPost }>(
      'http://localhost:3000/api/posts/' + id
    );
  }
  addPost(post: IPost, image: File) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image, post.title);
    this.http
      .post<{ message: string; post: IPost }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
        const newPost = {
          _id: responseData.post._id,
          title: responseData.post.title,
          content: responseData.post.content,
          imagePath: responseData.post.imagePath,
        };
        this.posts.push(newPost);
        this.changedPosts.next(this.posts.slice());
        this.router.navigate(['/']);
      });
  }
  updatedPost(
    id: string,
    title: string,
    content: string,
    image: File | string
  ) {
    let postData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        _id: id,
        title,
        content,
        imagePath: image,
      };
    }
    this.http
      .patch<{ message: string; updatedPost: IPost }>(
        `http://localhost:3000/api/posts/${id}`,
        postData
      )
      .subscribe((responseData) => {
        const updatedData = [...this.posts];
        const findUpdatedIndex = updatedData.findIndex(
          (item) => item._id === id
        );
        const post = {
          _id: id,
          title,
          content,
          imagePath: responseData.updatedPost.imagePath,
        };
        if (findUpdatedIndex !== -1) {
          updatedData[findUpdatedIndex] = post;
          this.changedPosts.next(this.posts.slice());
        }
        console.log(responseData.message);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(
      () => {
        const filteredPosts = this.posts.filter((post) => post._id !== postId);
        this.posts = filteredPosts;
        this.changedPosts.next(this.posts.slice());
      },
      (error) => {
        console.error('Failed to delete post:', error);
      }
    );
  }
}
