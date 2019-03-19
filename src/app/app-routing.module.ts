import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { WelcomeComponent } from './shared/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  {
    path: 'training',
    loadChildren: './training/training.module#TrainingModule',
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
