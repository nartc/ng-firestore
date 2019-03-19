import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingDialogComponent } from './current-training/stop-training-dialog/stop-training-dialog.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { trainingReducer } from './store';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training/training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingDialogComponent,
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  entryComponents: [ StopTrainingDialogComponent ],
})
export class TrainingModule {
}
