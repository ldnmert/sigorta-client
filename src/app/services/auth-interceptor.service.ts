// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Console } from 'console';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('authToken'); // JWT token'ı localStorage'dan alıyoruz

//     let clonedRequest = req;
    
//     if (token) {
//       console.log(token)
//       clonedRequest = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`)
//       });
//     }

//     return next.handle(clonedRequest);
//   }
// }