import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { IPost } from 'src/app/shared/ipost';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  isLoading: boolean = false;
  postsSubscription: Subscription = new Subscription();
  constructor(private postsService: PostsService) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.isLoading = false;
    this.postsSubscription = this.postsService
      .getPostsUpdated()
      .subscribe((data) => {
        this.posts = data;
      });
  }
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
