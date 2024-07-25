import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(public authService: AuthService, public http: HttpClient, private router: Router) {}

  // onSubmit() {
  //   const credentials = {
  //     username: this.username,
  //     password: this.password
  //   };
  //   this.authService.login(credentials).subscribe(
  //     token => {
  //       console.log('Received token:', token);
  //       // Token'ı local storage'a kaydedebilirsiniz veya başka bir işlem yapabilirsiniz
  //       localStorage.setItem('authToken', token);
  //     },
  //     error => {
  //       console.error('Login failed:', error);
  //     }
  //   );

  // }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (x) => {
        // Başarılı login sonrası ana sayfaya yönlendirin
  
         
        this.router.navigate(['/main-page']);

      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }



  ngOnInit() {
    const sign_in_btn = document.querySelector("#sign-in-btn") as HTMLElement;
    const sign_up_btn = document.querySelector("#sign-up-btn") as HTMLElement;
    const container = document.querySelector(".container") as HTMLElement;

    sign_up_btn.addEventListener('click', () =>{
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener('click', () =>{
      container.classList.remove("sign-up-mode");
    });
  }
}
