import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  page = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService) {}

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

    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        console.log(user);
        this.loggedInUser = user;
        localStorage.setItem('user', JSON.stringify(user));
      },
      (error) => {
        console.error(error);
        localStorage.setItem('user', JSON.stringify('null'));
      }
    );
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

  logout(_?: boolean) {
    this.authService
      .logout()
      .then(() => {
        console.log('Logged out');
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
