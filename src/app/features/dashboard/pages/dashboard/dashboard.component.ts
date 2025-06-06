import { Component } from '@angular/core';
import {DashboardStatisticsComponent} from '../../components/dashboard-statistics/dashboard-statistics.component'

@Component({
  selector: 'app-dashboard',
  imports: [DashboardStatisticsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
