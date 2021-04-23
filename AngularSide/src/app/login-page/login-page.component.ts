import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public signInForm: FormGroup;
  public signUpForm: FormGroup;
  public signInFailed: boolean;
  public errorMessage= '';

  loginEmail = new FormControl('', [Validators.required, Validators.email]);
  loginPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

  registerEmail = new FormControl('', [Validators.required, Validators.email]);
  registerUsername = new FormControl('', [Validators.required, Validators.minLength(3)]);
  registerPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  registerRePassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  getErrorMessage(control : FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    if(control.hasError('minlength')){
      return 'Value should be longer'
    }
    return control.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private router: Router,public fb: FormBuilder,private auth:AuthService) { 
    this.signInFailed = false;
    this.signInForm = this.fb.group({
      email: this.loginEmail,
      password: this.loginPassword
    });
    this.signUpForm = this.fb.group({
      username: this.registerUsername,
      email: this.registerEmail,
      password: this.registerPassword,
      rePassword: this.registerRePassword
    });
  }

  ngOnInit(): void {
  }

  async signIn(fg: FormGroup) {
    try {
      this.signInFailed = false;
      if (!fg.valid) throw new Error('Invalid sign-in credentials');
      this.auth.loginUser(fg.value.email,fg.value.password).subscribe((response:any)=>{
        if(typeof response == "string"){
          if(response.includes('Error')){
            
            this.signInFailed = true;
            this.errorMessage = response.replace('Error: ','');
          }else if(response == 'Successfuly logged in.'){
            this.router.navigate(['/success']);
          }
        }
      });
      
    } catch (error) {
      this.signInFailed = true;
      this.errorMessage = error.message
      console.log([error,this.signInFailed]);
    }
  }

  async signUp(fg: FormGroup) {
    try {
        this.signInFailed = false;
        if (!fg.valid) throw new Error('Invalid sign-in credentials');
        if(fg.value.password !== fg.value.rePassword) throw new Error('Passwords dont match');
        this.auth.registerUser(fg.value.username,fg.value.email,fg.value.password)
        .subscribe((response:any)=>{
          console.log(response);
          if(typeof response == "object"&&response.hasOwnProperty('username')&&response.hasOwnProperty('email')){
            this.router.navigate(['/success']);
          }
          if(typeof response == "string"){
            if(response.includes('Error')){
              
              this.signInFailed = true;
              this.errorMessage = response.replace('Error: ','');
            }
          }
        });

    } catch (error) {
      this.signInFailed = true;
      this.errorMessage = error.message
      console.log([error,this.signInFailed]);
    }
  }
}
