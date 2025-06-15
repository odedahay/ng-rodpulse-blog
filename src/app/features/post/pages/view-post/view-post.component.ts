import { Component, inject, input } from '@angular/core';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { BlogpostService } from '../../services/blogpost.service';
import { filter, switchMap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { BlogPostHelper } from '../../../../core/helpers/blogpost-helper';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-view-post',
  imports: [DatePipe, MarkdownModule, MarkdownComponent],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {
  private blogPostService = inject(BlogpostService);
  converTimestampToDate = BlogPostHelper.converTimestampToDate;

  slug = input<string | undefined>(undefined);
  // slug$ = toObservable(this.slug);

  // blogPost$ = this.slug$.pipe(
  //   filter(slug => slug !== undefined),
  //   switchMap(slug => this.blogPostService.getBlogPostBySlug(slug))
  // );

  // New Method RxResource

  private blogPostResource = rxResource({
    request: ()=> this.slug(),
    loader:({ request: slug }) => this.blogPostService.getBlogPostBySlug(slug)
  })

  blogPostData = this.blogPostResource.value;
  isLoading = this.blogPostResource.isLoading;

}
