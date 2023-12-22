import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-personal-score',
  standalone: true,
  imports: [],
  templateUrl: './personalscore.component.html',
  styleUrl: './personalscore.component.css'
})
export class PersonalscoreComponent {
  @Input() playerdata: any;

}
