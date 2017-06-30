import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../../../services';

@Component({
  selector: 'hg-panel-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class PanelAccountComponent implements OnInit {
  form: FormGroup;
  user;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    this.form = this.formBuilder.group({
      name: [this.user.name],
      password: [''],
      confirm: [''],
      oldpass: ['', Validators.required]
    });

    console.log(this.form.controls);
  }

  onSubmit(formData) {
    console.log(formData);
  }

}
