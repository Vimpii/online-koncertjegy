import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TimestampPipe } from '../../shared/pipes/timestamp.pipe';

@NgModule({
  declarations: [ProfileComponent, TimestampPipe],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    MatFormField,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
  ],
})
export class ProfileModule {}
