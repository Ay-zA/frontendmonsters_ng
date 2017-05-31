import { Component, OnInit } from '@angular/core';
import { Event as RouterEvent, Router, ActivatedRoute, NavigationStart,
  NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { User } from '../../models';
@Component({
  selector: 'hg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading: boolean;
  user: User;

  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
