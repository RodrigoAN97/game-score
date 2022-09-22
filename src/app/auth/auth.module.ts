import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ConfirmPermissionsComponent } from './confirm-permissions/confirm-permissions.component';

@NgModule({
  declarations: [LoginComponent, ConfirmPermissionsComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
