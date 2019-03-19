import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { DestroyableComponent } from '../../shared/common/destroyable';
import { UiService } from '../../shared/services/ui.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: [ './signin.component.scss' ],
})
export class SigninComponent extends DestroyableComponent implements OnInit {
  signinForm: FormGroup;
  isLoading: boolean;

  constructor(private readonly formBuilder: FormBuilder,
              private authService: AuthService,
              private uiService: UiService) {
    super();
  }

  ngOnInit() {
    this.initForm();
    this.uiService.loading$.pipe(takeUntil(this.destroy$))
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });
  }

  private initForm(): void {
    this.signinForm = this.formBuilder.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ],
      isRemembered: [ false ],
    });
  }

  get emailControl(): FormControl {
    return this.signinForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signinForm.get('password') as FormControl;
  }

  onSigninFormSubmit() {
    const { email, password } = this.signinForm.value;
    this.authService.login({
      email,
      password,
    }).subscribe();
  }

  signInWithGoogle() {
    // this.authService.loginWithGoogle();
  }
}
