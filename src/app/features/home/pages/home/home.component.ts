import { Component, inject } from '@angular/core';
import { BlogpostService } from '../../../post/services/blogpost.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogPostHelper } from '../../../../core/helpers/blogpost-helper';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  blogPostService = inject(BlogpostService);

  blogPosts = toSignal(this.blogPostService.getAllBlogs());

  converTimestampToDate = BlogPostHelper.converTimestampToDate;

}
