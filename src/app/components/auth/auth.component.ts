import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hg-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  constructor() {
    this.isLoginOpen = true;
  }

  ngOnInit() {
  }

  onPanelClick(panelName: string) {
    this.isLoginOpen = panelName === 'login';
    this.isRegisterOpen = !this.isLoginOpen;
  }
}
