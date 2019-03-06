import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { MaterialModule } from '../material.module';
import { StopTrainingDialogComponent } from './current-training/stop-training-dialog/stop-training-dialog.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingDialogComponent,
  ],
  imports: [CommonModule, TrainingRoutingModule, MaterialModule, FlexLayoutModule],
  entryComponents: [StopTrainingDialogComponent],
})
export class TrainingModule {}
