import { Routes } from '@angular/router';
import {GridComponent} from "./Components/grid/grid.component";
import {HomepageComponent} from "./Components/homepage/homepage.component";
import {ListgameComponent} from "./Components/listgame/listgame.component";
import {RegisterpageComponent} from "./Components/registerpage/registerpage.component";

export const routes: Routes = [
  {path:'login',component:HomepageComponent},
  {path:'grid',component:GridComponent},
  {path:'list',component:ListgameComponent},
  {path:'register',component:RegisterpageComponent}

];
