import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BlogpostService } from '../../services/blogpost.service';
import { MarkdownModule } from 'ngx-markdown';
import { ImageService } from '../../../../shared/services/image.service';
import { getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule, MarkdownModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  contentData  = signal('')
  blogPostService = inject(BlogpostService);
  imageService = inject(ImageService);
  router = inject(Router);
  toastr = inject(ToastrService);

  createPostForm = new FormGroup({
    title: new FormControl<string>('',
      {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100), Validators.minLength(6)]
      }
    ),
    content: new FormControl<string>('',
      {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(3000)]
      }
    ),
    coverImageUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(3000)]
    })
  });

  get title(){
    return this.createPostForm.controls.title;
  }

  get content(){
    return this.createPostForm.controls.content;
  }

  onFormSubmit() {
    if(this.createPostForm.invalid){
      return;
    }

    this.blogPostService.createBlogPost(
      this.createPostForm.getRawValue().title, 
      this.createPostForm.getRawValue().content,
      this.createPostForm.getRawValue().coverImageUrl
    );
    this.createPostForm.reset();
    this.router.navigateByUrl('/dashboard').then(
      ()=>{
        this.toastr.success('Successfully saved!');
      }
    )
  }

  onContentChange(){
    this.contentData.set(this.createPostForm.getRawValue().content);
  }

  onCoverImageSelected(input: HTMLInputElement){
    if(!input.files || input.files.length <= 0){
      return;
    }

    const file: File = input.files[0];

    this.imageService.uploadImage(file.name, file)
      .then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          this.createPostForm.patchValue({
            coverImageUrl:downloadUrl
          })
          //alert('Image uploaded successfully!')
          this.toastr.success('Image uploaded successfully!');
        });
        // this.imageService.getDownloadUrl(snapshot).then((downloadUrl) => {
        //   this.createPostForm.patchValue({
        //     coverImageUrl:downloadUrl
        //   });
        //   alert('Image uploaded successfully!')
        // })
      })
    
  }
}
