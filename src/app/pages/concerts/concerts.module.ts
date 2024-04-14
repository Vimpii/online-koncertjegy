import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcertsRoutingModule } from './concerts-routing.module';
import { ConcertsComponent } from './concerts.component';

@NgModule({
  declarations: [ConcertsComponent],
  imports: [CommonModule, ConcertsRoutingModule],
})
export class ConcertsModule {}
