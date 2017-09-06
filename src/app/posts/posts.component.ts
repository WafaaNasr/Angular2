import { BadRequestError } from './../common/errors/bad-request-error';
import { NotFoundError } from './../common/errors/not-found-error';
import { AppError } from './../common/errors/app-error';
import {PostService} from './../services/post.service';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[];

  constructor(private service: PostService) {}

  //TODO: Add Global Error
  // ngOnInit(): void {
  //   this.service.getPost().subscribe(response => {
  //     this.posts = response.json();
  //   },(error : Response)=>{
  //   alert('An expected error occured..');
  //   console.log(error);
  // });
  // }

  ngOnInit(): void {
    this.service.getAll().subscribe(post => this.posts = post);
  }

  createPost(input: HTMLInputElement) {
    const post: any = { title: input.value};
    this.posts.splice(0, 0, post); // Optimistic Update

    input.value = '';

    this.service.create(post)
    .subscribe(
      (newPost) => {
        post.id = newPost.id;
        // this.posts.splice(0, 0, post); // Pessimistic Update
      },
      (error: AppError) => {
        if (error instanceof BadRequestError) {
          // this.form.setErrors(error.originalError);
          this.posts.splice(0, 1);
        } else {
          throw error;
        } // Will be catched by the global error handler
      });
  }

  updatePost(post) {
    this.service.update(post.id, {
      isRead: true
    }).subscribe((updatedPost) => {
      console.log(updatedPost);
    });
  }

  deletePost(post) {
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id)
    .subscribe(() => {},
        (error: AppError) => {
          this.posts.splice(index, 0, post);
            if (error instanceof NotFoundError) { // Handling Expected Errors : Not Found
                alert('This post has been deleted...');
            } else {
              throw error;
            }
      });
  }

}
