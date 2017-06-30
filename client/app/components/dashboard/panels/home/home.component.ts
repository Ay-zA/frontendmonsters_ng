import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Roles } from '../../../../models';

@Component({
  selector: 'hg-panel-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class PanelHomeComponent implements OnInit {
  user: User;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    if (!this.user) {
      this.router.navigate(['/']);
    }
  }
}
