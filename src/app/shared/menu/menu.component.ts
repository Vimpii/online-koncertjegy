import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input() currentPage: string = '';
  @Input() loggedInUser?: firebase.default.User | null;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter<boolean>();

  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }

  close(logout?: boolean) {
    if (logout === true) {
      this.onLogout.emit(true);
    }
    this.onCloseSidenav.emit(true);
  }
}
