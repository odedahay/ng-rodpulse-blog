import { Component, computed, inject } from '@angular/core';
import {DashboardStatisticsComponent} from '../../components/dashboard-statistics/dashboard-statistics.component'
import { BlogpostService } from '../../../post/services/blogpost.service';
import { toSignal } from '@angular/core/rxjs-interop'
import { Timestamp } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardStatisticsComponent, DatePipe, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  blogPostService = inject(BlogpostService)

  blogPosts = toSignal(this.blogPostService.getBlogPostsByUser());

  sortedBlogPosts = computed(()=>{
    const posts = this.blogPosts();
    if (!posts) return [];

    return [...posts].sort((a, b)=>{
      return b.publishedOn.seconds - a.publishedOn.seconds;
    })
  })

  totalBlogPosts = computed(() =>{
    return this.blogPosts()?.length
  })

  converTimestampToDate(timestamp: Timestamp){
    return timestamp.toDate();
  }

}
