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
    console.log('PageHeaderComponent initialized');
    this.setupMessageListener();
    this.checkLocalStorageAndLogin();
  }

  ngOnDestroy() {
    console.log('Removing message listener');
    if (this.messageListener) {
      window.removeEventListener('message', this.messageListener);
    }
  }

  private setupMessageListener() {
    console.log('Setting up message listener');
    this.messageListener = (event: MessageEvent) => {
      console.log('Received message:', event);

      // Log the origin of the message
      console.log('Message origin:', event.origin);

      // Check if the event has data
      if (event.data) {
        console.log('Message data:', event.data);

        // Check if the isOpen property exists and is 'true'
        if (event.data.isOpen === 'true') {
          console.log('isOpen is true, setting localStorage');
          this.ngZone.run(() => {
            localStorage.setItem('isOpen', 'true');
            console.log('localStorage after setting:', localStorage.getItem('isOpen'));
            this.checkLocalStorageAndLogin();
          });
        } else {
          console.log('isOpen is not true or not present in the message');
        }
      } else {
        console.log('No data in the message');
      }
    };

    window.addEventListener('message', this.messageListener);
    console.log('Message listener set up');
  }

  private checkLocalStorageAndLogin() {
    console.log('Checking localStorage');
    const isOpen = localStorage.getItem('isOpen');
    console.log('isOpen in localStorage:', isOpen);
    if (isOpen === 'true') {
      console.log('Calling goToLogin');
      this.goToLogin();
      localStorage.removeItem('isOpen');
      console.log('Removed isOpen from localStorage');
    } else {
      console.log('isOpen is not true in localStorage');
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


