import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';

@Component({
  selector: 'app-logged-in-functionality',
  imports: [RouterLink],
  templateUrl: './logged-in-functionality.component.html',
  styleUrl: './logged-in-functionality.component.css'
})
export class LoggedInFunctionalityComponent {
  navbarService = inject(NavbarService);
}
