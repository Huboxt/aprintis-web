import { Component, Input, OnInit, NgZone, OnDestroy } from '@angular/core';
import { MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { AuthService } from 'auth/auth.service';
import { environment } from 'environments/environment';
import { Observable, Subscription } from 'rxjs';
import { role, User } from '_models';
import { LoginService } from '_services';
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit, OnDestroy  {
  assetsUrl = environment.assetsUrl;
  isAdmin = false;
  isAuthenticated$: Observable<boolean>;
  currentUser: User;
  @Input() headerclass: string;
  // TODO: completar (busqueda)
  textQuery = '';
  offsetLimit = 0;

  private messageListener: any;

  constructor(
    protected router: Router,
    protected authService: AuthService,
    protected loginService: LoginService,
    protected ngZone: NgZone,
    ) {
    this.isAuthenticated$ = this.authService.isAuthenticated();
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.authService.isRole(role.admin);
  }

  ngOnInit() {
    this.setupMessageListener();
    this.checkLocalStorageAndLogin();
  }

  ngOnDestroy() {
    // Видаляємо слухача подій при знищенні компонента
    if (this.messageListener) {
      window.removeEventListener('message', this.messageListener);
    }
  }

  private setupMessageListener() {
    this.messageListener = (event: MessageEvent) => {
      // Перевіряємо походження повідомлення (замініть на ваш домен)
      if (event.origin !== "https://v2-aprintis.huboxt.com") return;

      if (event.data.isOpen === 'true') {
        this.ngZone.run(() => {
          localStorage.setItem('isOpen', 'true');
          this.checkLocalStorageAndLogin();
        });
      }
    };

    window.addEventListener('message', this.messageListener);
  }

  private checkLocalStorageAndLogin() {
    const isOpen = localStorage.getItem('isOpen');
    if (isOpen === 'true') {
      this.goToLogin();
      localStorage.removeItem('isOpen');
    }
  }


  // checkLocalStorageAndLogin() {
  //   const isOpen = localStorage.getItem('isOpen');
  //   if (isOpen === 'true') {
  //     this.goToLogin();
  //   }
  // }

  setDialogConfig(panelClass: string[], data: any): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = panelClass;
    dialogConfig.data = data;
    return dialogConfig;
  }

  goToLogin() {
    // this.router.navigate([{ outlets: { popup: 'login' } }], { queryParamsHandling: 'preserve' });
    this.loginService.loginDialog();
    // localStorage.removeItem('isOpen');
  }

  logout() {
    this.authService.logout();
  }

  goToDashboard() {
    if (this.isAdmin) {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  clickRegister() {
    if (this.authService.getCurrentUser()) {
      if (this.authService.isRole(role.admin)) {
        this.router.navigateByUrl('/admin');
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    } else {
      this.router.navigateByUrl('/register');
    }
  }

  clickGetStarted() {
    if (this.authService.getCurrentUser()) {
      if (this.authService.isRole(role.admin)) {
        this.router.navigateByUrl('/admin');
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    } else {
      this.router.navigateByUrl('/onboarding');
    }
  }

  makeReferral() {
    this.router.navigateByUrl('referral');
  }
}


