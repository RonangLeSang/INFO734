import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';

import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-registerpage',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.css'
})
export class RegisterpageComponent {

}
