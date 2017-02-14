import {Routes} from "@angular/router"
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LostPasswordComponent} from "./lost-password/lost-password.component";

export const authRoutes:Routes=[
  {path:'signin',component:SignInComponent },
  {path:'signup',component:SignUpComponent },
  {path:'lostpassword',component:LostPasswordComponent },
  ];
