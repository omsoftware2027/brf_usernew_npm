import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rolePrivelegesSubject = new BehaviorSubject<any>('');
  rolePrivelegesObservable$ = this.rolePrivelegesSubject.asObservable();

  curentRolePrivelegesSubject = new BehaviorSubject<any>('');
  currentRolePrivelegesObservable$ = this.curentRolePrivelegesSubject.asObservable();

  accessVerificationSubject = new BehaviorSubject<any>('');
  accessVerificationObservable$ = this.accessVerificationSubject.asObservable();

  importExportSubject = new BehaviorSubject<any>('');
  importExportObservable$ = this.importExportSubject.asObservable();

  accessRouterLinkSubject = new BehaviorSubject<any>('');
  accessRouterLinkObservable$ = this.accessRouterLinkSubject.asObservable();

  loggedInUserSubject = new BehaviorSubject<any>('');
  loggedInUserObservable$ = this.loggedInUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(data:any) {
    return this.http.post<any>(`${environment.baseurl}/auth/login`, data)
      .pipe(
        map(LData => {
          this.rolePrivelegesDataObservable(LData['response']['rolePriveleges']);
          if (LData.status === 0) {
            localStorage.setItem('id', LData.response.teamId);
            localStorage.setItem('token',LData.response.token);
            localStorage.setItem('name',LData.response.name);
            localStorage.setItem('usertype',LData.response.userType);
            this.loggedInUserObservable(LData.response.name);
            return {value: '0'};
          } else {
            return {value: '1' , Error: LData.Error};
          }
        })
      );
  }

  public rolePrivelegesDataObservable(data:any) {
    this.rolePrivelegesSubject.next(data);
  }

  public currentRolePrivelegesObservable(data:any) {
    this.curentRolePrivelegesSubject.next(data);
  }

  public accessVerificationObservable(data:any) {
    this.accessVerificationSubject.next(data);
  }

  public importExportObservable(data:any) {
    this.importExportSubject.next(data);
  }

  public accessRouterLinkObservable(data:any){
    this.accessRouterLinkSubject.next(data);
  }

  public loggedInUserObservable(data:any){
    this.loggedInUserSubject.next(data);
  }
}
