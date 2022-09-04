import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { regexEmailPattern } from '../../shared/regex';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  createNew = false;
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(regexEmailPattern),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  createUserForm = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(regexEmailPattern),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
