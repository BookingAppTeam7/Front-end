import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/auth.service';
import { RoleEnum } from 'src/app/models/userEnums.model';
import { UserGetDTO } from 'src/app/models/userGetDTO.model';
import { UserService } from 'src/app/user.service';
import { environment } from 'src/env/env';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private authService: AuthService) {}
  user:UserGetDTO;
  role: RoleEnum ;
 // private cdr: ChangeDetectorRef;
  
  
  ngOnInit(): void {
 
  
    this.authService.userState.subscribe((result) => {
      if(result != null){
        this.role = result.role;
      }else{
       this.role=RoleEnum.UNAUTHENTICATED;
      }
     // this.cdr.detectChanges();
    })
  }

  logout(): void {
    console.log("LOG OUT ")
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    console.log("USAO U IS ADM")
    console.log('ROLA JE ', this.role)
 
    return this.authService.getRole() == RoleEnum.ADMIN;
  }

  isGuest(): boolean {
    return this.authService.getRole() == RoleEnum.GUEST;
  }

  isOwner(): boolean {
    return this.authService.getRole() == RoleEnum.OWNER;
  }

 }
 



