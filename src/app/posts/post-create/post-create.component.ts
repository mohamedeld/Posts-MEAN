import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { IPost } from 'src/app/shared/ipost';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredTitle: string = '';
  enteredContent: string = '';
  constructor(private postsService: PostsService) {}
  onAddPost(myForm: NgForm) {
    if (myForm.invalid) {
      return;
    }
    const post: IPost = {
      id: null,
      title: myForm.value.title,
      content: myForm.value.content,
    };
    this.postsService.addPost(post);
  }
}
