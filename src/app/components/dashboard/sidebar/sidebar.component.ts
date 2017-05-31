import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'hg-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {
  }

}
