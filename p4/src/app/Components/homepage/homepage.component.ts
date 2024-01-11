import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConnexionService } from '../../Services/connexion.service';
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './homepage.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  @Input() user!: string;
  @Input()
  password!: string;

  @Output() loginSuccess = new EventEmitter<number[][]>();


  constructor(private connexionService: ConnexionService,private cookie:CookieService, private router: Router) {}

  ngOnInit(): void {
  }
  register():void{
    this.router.navigate(['/register']);

  }
  login(): void {
    this.connexionService.login(this.user, this.password).subscribe(
      (response: any) => {
        // Assuming the response contains the session information, adjust accordingly
        const sessionData = response.session;

        // Store the session information in localStorage
        localStorage.setItem('session', JSON.stringify(sessionData));
        this.router.navigate(['/list']);
        console.log('Login successful. Session data:', sessionData);
      },
      (error: any) => {
        console.error('Login error:', error);
      }
    );
  }
}
