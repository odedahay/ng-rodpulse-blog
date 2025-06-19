import { Component, inject, input, OnInit, signal } from '@angular/core';
import { BlogpostService } from '../../services/blogpost.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { ImageService } from '../../../../shared/services/image.service';
import { getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-post',
  imports: [ReactiveFormsModule, MarkdownModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {

  contentData = signal('')
  imageService = inject(ImageService);
  blogPostService = inject(BlogpostService);
  router = inject(Router);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.blogPostService.getBlogPostBySlug(this.slug() ?? '')
      .subscribe({
        next: (blogPost) => {
          if (!blogPost) {
            // Optional: Redirect or handle not found
            this.router.navigateByUrl('/dashboard');
            return;
          }
          this.editPostForm.patchValue({
            title: blogPost.title,
            content: blogPost.content,
            coverImageUrl: blogPost.coverImageUrl,
            slug: blogPost.slug
          });
          this.contentData.set(blogPost.content);
        },
        error: () => {
          this.router.navigateByUrl('/not-found');
        }
      });
  }

  editPostForm = new FormGroup({
    slug: new FormControl<string>('',
      {
        nonNullable: true,
        validators: [Validators.required]
      }
    ),
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

  get title() {
    return this.editPostForm.controls.title;
  }

  get content() {
    return this.editPostForm.controls.content;
  }

  slug = input<string | undefined>(undefined)

  onContentChange() {
    this.contentData.set(this.editPostForm.getRawValue().content);
  }

  onCoverImageSelected(input: HTMLInputElement) {
    if (!input.files || input.files.length <= 0) {
      return;
    }

    const file: File = input.files[0];

    this.imageService.uploadImage(file.name, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          this.editPostForm.patchValue({
            coverImageUrl: downloadUrl
          })
          alert('Image uploaded successfully!')
        });
        // this.imageService.getDownloadUrl(snapshot).then((downloadUrl) => {
        //   this.createPostForm.patchValue({
        //     coverImageUrl:downloadUrl
        //   });
        //   alert('Image uploaded successfully!')
        // })
      })

  }

  onFormSubmit() {
    if (this.editPostForm.invalid) {
      return;
    }
    const rawValue = this.editPostForm.getRawValue();
    this.blogPostService.updateBlogPost(
      rawValue.slug,
      rawValue.title,
      rawValue.content,
      rawValue.coverImageUrl
    );
    this.router.navigateByUrl('/dashboard');
  }

  onDelete(slug: string) {
    this.blogPostService.deleteBlogPostBySlug(slug)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/dashboard')
        }
      })
  }

  showDeleteModal = signal(false);

  openDeleteModal() {
    console.log('openDeleteModal called');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
  }


  confirmDelete() {
    const slug = this.editPostForm.get('slug')?.value;
    if (!slug) {
      alert('Invalid post slug.');
      return;
    }
  
    this.blogPostService.deleteBlogPostBySlug(slug)
      .subscribe({
        next: () => {
          this.showDeleteModal.set(false); // close modal
          this.router.navigateByUrl('/dashboard').then(()=>{
            this.toastr.warning('Previous post is deleted!');
          }); // navigate after delete
        },
        error: (err) => {
          console.error('Failed to delete post:', err);
          alert('Could not delete post.');
          this.showDeleteModal.set(false); // still close modal
        }
      });
  }

}
