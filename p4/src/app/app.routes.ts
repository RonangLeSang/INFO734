import { Routes } from '@angular/router';
import {GridComponent} from "./Components/grid/grid.component";
import {HomepageComponent} from "./Components/homepage/homepage.component";


export const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'grid',component:GridComponent}

];
