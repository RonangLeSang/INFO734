import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';
import {RegisterService} from "../../Services/register.service";
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerpage',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.css'
})
export class RegisterpageComponent implements OnInit {
  @Input() user!: string;
  @Input()
  password!: string;
  @Output() loginSuccess = new EventEmitter<number[][]>();
  constructor(private registerService: RegisterService, private router: Router){}
  ngOnInit(): void {

  }
  annuler():void{
    this.router.navigate(['/']);

  }
  register():void{
    this.registerService.register(this.user, this.password).subscribe(
    (response: any) => {
      // Assuming the response contains the session information, adjust accordingly
      const sessionData = response.session;

      // Store the session information in localStorage

      this.router.navigate(['/']);
      console.log('register successful. Session data:', sessionData);

    },
    (error: any) => {
      console.error('register error:', error);
    }
  );

  }

}
