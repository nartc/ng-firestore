import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }
  private initForm(): void {
    this.signinForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      isRemembered: [false],
    });
  }

  get emailControl(): FormControl {
    return this.signinForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signinForm.get('password') as FormControl;
  }

  onSigninFormSubmit() {
    console.log(this.signinForm);
  }
}
