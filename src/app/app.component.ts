import { Component } from '@angular/core';
import { User } from './user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  private users:any = [];

	private id:number = 0;

  private firstName: string='';
  private lastName: string='';
  private email:string=''; 

  private errMessage = ['','',''];

	constructor(private store: Store<any>) {
		store.select('userData').subscribe(data => {
			store = data;
		this.users = data;			
		});

	}

  validateFields():boolean{
    let err = false;
    if (!this.firstName.length) {
      this.errMessage[0] = 'Please enter your first name';      
      err = true;
    };
    if (!this.lastName.length) {
      this.errMessage[1] = 'Please enter your last name';
      err = true;
    };
    if (!this.email.length) {
      this.errMessage[2] = 'Please enter your e-mail';
      err = true;
    };
    if (this.email.split('').indexOf('@') === -1 || this.email.split('').indexOf('.') === -1) {
      this.errMessage[2] = 'Please enter the correct e-mail';
      err = true;
    } else {
      if (this.email.split('').reverse().slice(0,this.email.split('').reverse().indexOf('.')).length > 3 || 
          this.email.split('').reverse().slice(0,this.email.split('').reverse().indexOf('.')).length <= 1) {
        this.errMessage[2] = 'Please enter the correct e-mail';
        err = true;
      }      
    }
    return !err;
  }

  onSubmit() {
    this.errMessage = ['','',''];  
    if (this.validateFields()){
    	this.addUser({
      		id: ++this.id,
    			firstName: this.firstName,
    			lastName: this.lastName,
    			email: this.email		
    	});
    this.firstName = '';
    this.lastName = '';
    this.email = '';  
    };
  }

  addUser(user:User){
  	this.store.dispatch({
  		type: 'ADD_USER',
  		payload: user
  	});  	
  }

  removeUser(user:User){
  	this.store.dispatch({
  		type: 'REMOVE_USER',
  		payload: user
  	});  
  }
}
