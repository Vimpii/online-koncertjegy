import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';

@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {
  transform(value: Timestamp, ...args: unknown[]): string {
    const date = value.toDate();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
