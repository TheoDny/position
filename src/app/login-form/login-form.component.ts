import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss',
  ]
})

export class LoginFormComponent implements OnInit {

  loginForm: FormGroup = this.initForm()
  errorMessage: string = "";

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
  }

  initForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    //@ts-ignore
    const email = this.loginForm.get("email").value
    //@ts-ignore
    const password = this.loginForm.get("password").value
    this.authService.signinUser(email,password)
    .then(() => {
      this.router.navigate(['/view/systeme']);
    },(error) => {
      this.errorMessage = error.message;
    }
    )
  }
}
