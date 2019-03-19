import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './auth/services/auth.service';
import { DestroyableComponent } from './shared/common/destroyable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent extends DestroyableComponent implements OnInit {
  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.authService.isAuthenticatedListener$.pipe(takeUntil(this.destroy$)).subscribe();
  }
}
