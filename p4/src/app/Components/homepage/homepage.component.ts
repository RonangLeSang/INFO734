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

  login(): void {
    this.connexionService.login(this.user, this.password).
    subscribe((response: string) => {
      this.cookie.set('cookie',response);
      this.router.navigate(['/list']);
      console.log(response);
    }), (error: any) => {
        console.error('Login error:', error);
      };
  }
}
