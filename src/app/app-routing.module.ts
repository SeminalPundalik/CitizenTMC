import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './GlobalComponent/login/login.component';
import { RegisterpageComponent } from './GlobalComponent/registerpage/registerpage.component';
import { DashboardComponent } from './GlobalComponent/dashboard/dashboard.component';
import { ProfileComponent } from './Securedcomponents/profile/profile.component';
import { OnlineapplicationsComponent } from './Securedcomponents/onlineapplications/onlineapplications.component';
import { SearchDetailsComponent } from './Securedcomponents/search-details/search-details.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterpageComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'OnlineApplication', component: OnlineapplicationsComponent },
  { path: 'Search', component: SearchDetailsComponent },
  {path:'**', redirectTo: 'Dashboard'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
