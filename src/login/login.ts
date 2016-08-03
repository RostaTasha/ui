import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { MessageComponent } from '../common/message-component';

const styles   = require('./login.css');
const template = require('./login.html');

@Component({
  selector: 'login',
  directives: [ ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, MessageComponent],
  template: template + `<message-component *ngIf="message" [_message]="message"></message-component>`,
  styles: [ styles ]
})
export class Login {
  message : string;
  
  constructor(public router: Router, public http: Http) {
  }

  login(event, username, password) {
	this.message = '';
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    this.http.post('http://localhost:3001/sessions/create', body, { headers: contentHeaders })
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

  signup(event) {
    event.preventDefault();
    this.router.navigate(['/signup']);
  }
}
