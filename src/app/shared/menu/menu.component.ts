import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter<string>();

  menuSwitch(page: string) {
    this.selectedPage.emit(page);
  }
}
