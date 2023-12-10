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
  getPostById(id: string) {
    return this.http.get<{ message: string; post: IPost }>(
      'http://localhost:3000/api/posts/' + id
    );
  }
  addPost(post: IPost) {
    this.http
      .post<{ message: string; post: IPost }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
        const newPost = {
          _id: responseData.post._id,
          title: responseData.post.title,
          content: responseData.post.content,
        };
        this.posts.push(newPost);
        this.changedPosts.next(this.posts.slice());
      });
  }
  updatedPost(id: string, title: string, content: string) {
    const updatedPostData = { _id: id, title, content };
    this.http
      .patch<{ message: string; updatedPost: IPost }>(
        `http://localhost:3000/api/posts/${id}`,
        updatedPostData
      )
      .subscribe((responseData) => {
        const updatedData = [...this.posts];
        const findUpdatedIndex = updatedData.findIndex(
          (item) => item._id === updatedPostData._id
        );
        if (findUpdatedIndex !== -1) {
          updatedData[findUpdatedIndex] = updatedPostData;
          this.changedPosts.next(this.posts.slice());
        }
        console.log(responseData.message);
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
