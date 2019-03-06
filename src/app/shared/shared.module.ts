import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from '../material.module';
import { SideNavListComponent } from './side-nav-list/side-nav-list.component';

@NgModule({
  declarations: [WelcomeComponent, NavbarComponent, SideNavComponent, SideNavListComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FlexLayoutModule],
  exports: [WelcomeComponent, SideNavComponent],
})
export class SharedModule {}
