import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [CookieService]
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

comparePassword(c: AbstractControl) {
  const v = c.value;
  return v.password === v.confirmPassword
    ? null
    : {
        passwordnotmatch: true,
      };
    }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],
    });

    this.registerForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(4),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(5),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.minLength(5), Validators.email],
      ],
      pw: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.maxLength(30),
              Validators.minLength(6),
            ],
          ],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: this.comparePassword }
      ),
    });
  }

  submitLoginForm() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
  }
  submitRegisterForm(value: {username: string, pw: {password: string, confirmPassword: string}, phoneNumber: string, email: string}) {
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }

    console.log(this.registerForm.valid)
  }
}
