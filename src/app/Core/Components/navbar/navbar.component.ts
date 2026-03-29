import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Dropdown } from 'bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/Features/Auth/Services/auth.service';
import { User } from 'src/app/Features/Auth/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit,OnInit {
  user? : User;

  constructor(private authService: AuthService,
              private router : Router) {
    
  }

  ngOnInit() : void {
    this.authService.user().subscribe({
      next: (user) => {
        this.user = user;
      }
    });

    this.user = this.authService.getUser();
  }

  ngAfterViewInit() {
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl);
    });
  }


  

  onLogout() : void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}