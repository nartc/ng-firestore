import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [ SignupComponent, SigninComponent ],
  imports: [ CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule ],
})
export class AuthModule {
}
