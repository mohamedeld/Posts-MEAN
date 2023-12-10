import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { IPost } from 'src/app/shared/ipost';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle: string = '';
  enteredContent: string = '';
  private postId: string | null = null;
  mode: string = 'create';
  post: IPost = { _id: '', title: '', content: '' };
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        this.mode = 'update';
        this.postId = paramMap.get('id');
        if (this.postId) {
          this.postsService
            .getPostById(this.postId)
            .subscribe((responseData) => {
              this.post = responseData.post;
            });
        }
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onAddPost(myForm: NgForm) {
    if (myForm.invalid) {
      return;
    }
    if (this.mode === 'update') {
      if (this.postId) {
        this.postsService.updatedPost(
          this.postId,
          myForm.value.title,
          myForm.value.content
        );
      }
    } else {
      const post: IPost = {
        _id: '',
        title: myForm.value.title,
        content: myForm.value.content,
      };
      this.postsService.addPost(post);
    }
    myForm.resetForm();
  }
}
