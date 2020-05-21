import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DeliveriesComponent } from './pages/deliveries/deliveries.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './guards/auth-guard';
import { MotoboyComponent } from './pages/motoboy/motoboy.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
];

const userType: string = 'motoboy';

if (userType === 'admin') {
  routes.push({ path: '', component: DeliveriesComponent, canActivate: [AuthGuard] });
}

if (userType === 'motoboy') {
  routes.push({ path: '', component: MotoboyComponent, canActivate: [AuthGuard] });
}


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
