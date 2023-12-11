import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { IPost } from 'src/app/shared/ipost';
import { mimeType } from './mime-type.validator';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle: string = '';
  enteredContent: string = '';
  private postId: string | null = null;
  form: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  mode: string = 'create';
  imagePreview: string = '';
  post: IPost = { _id: '', title: '', content: '', imagePath: '' };
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl('', {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        this.mode = 'update';
        this.isLoading = true;
        this.postId = paramMap.get('id');
        if (this.postId) {
          this.postsService
            .getPostById(this.postId)
            .subscribe((responseData) => {
              console.log(responseData);
              this.isLoading = false;
              this.post = responseData.post;
              this.form.setValue({
                title: responseData.post.title,
                content: responseData.post.content,
                image: responseData.post.imagePath,
              });
            });
        }
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement | null)?.files?.[0];
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file as File);
  }
  onAddPost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'update') {
      if (this.postId) {
        this.postsService.updatedPost(
          this.postId,
          this.form.value.title,
          this.form.value.content,
          this.form.value.image
        );
      }
    } else {
      const post: IPost = {
        _id: '',
        title: this.form.value.title,
        content: this.form.value.content,
        imagePath: this.form.value.imagePath,
      };
      this.postsService.addPost(post, this.form.value.image);
    }
    this.form.reset();
  }
}
