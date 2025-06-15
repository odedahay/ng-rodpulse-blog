import { Component, ElementRef, HostListener, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';
import { User } from '../../../models/user.model';
import { BlogpostService } from '../../../../features/post/services/blogpost.service';

@Component({
  selector: 'app-logged-in-functionality',
  imports: [RouterLink],
  templateUrl: './logged-in-functionality.component.html',
  styleUrl: './logged-in-functionality.component.css'
})
export class LoggedInFunctionalityComponent {
  constructor(
    public navbarService: NavbarService,
    private elementRef: ElementRef
  ) {}

  user = input.required<User>();
  blogPostService = inject(BlogpostService);

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.navbarService.isMenuVisible()) {
      this.navbarService.closeUserMenu();
    }
  }

  createBatch(){
    this.blogPostService.batchUpload().subscribe({
      next: ()=>{
        alert('Batch finished successfully');
      }
    })
  }
}
