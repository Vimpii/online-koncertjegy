import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  page = '';

  routes: Array<string> = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.routes = this.router.config.map((conf) => conf.path as string);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((evts: any) => {
        const CurrentPage = (evts.urlAfterRedirects as string).split(
          '/'
        )[1] as string;
        if (this.routes.includes(CurrentPage)) {
          this.page = CurrentPage;
        }
      });
  }

  changePage(page: string) {
    // this.page = page;
    this.router.navigateByUrl(page);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }
}
