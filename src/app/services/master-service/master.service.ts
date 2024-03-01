import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private reload = new Subject<any>();
  constructor() { }

  sendUpdate(message: string) { //the component that wants to update something, calls this funtion
      this.reload.next({ text: message }); //next() will feed the value in Subject
  }

  getUpdate(): Observable<any> { //the receiver component calls this function 
      return this.reload.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

}
