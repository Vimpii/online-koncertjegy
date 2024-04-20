import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcertsRoutingModule } from './concerts-routing.module';
import { ConcertsComponent } from './concerts.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimestampPipe } from '../../shared/pipes/timestamp.pipe';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ConcertsComponent, TimestampPipe],
  imports: [
    CommonModule,
    ConcertsRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ConcertsModule {}
