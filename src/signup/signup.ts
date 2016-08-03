import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { MessageComponent } from '../common/message-component';

const styles   = require('./signup.css');
const template = require('./signup.html');

@Component({
  selector: 'signup',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, MessageComponent ],
  template: template + `<message-component *ngIf="message" [_message]="message"></message-component>`,
  styles: [ styles ]
})
export class Signup {

  message : string;
  
  constructor(public router: Router, public http: Http) {
  }

  signup(event, username, password, email) {
  	this.message = '';
    event.preventDefault();
    let body = JSON.stringify({ username, password, email});
    this.http.post('http://localhost:3001/users', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          this.router.navigate(['/home']);
        },
        error => {
          this.message = error.text();
		  console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

}
