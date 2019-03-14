import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class DestroyableComponent implements OnDestroy {
  protected destroy$: Subject<null> = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
