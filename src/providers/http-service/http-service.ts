import { Http, Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

 constructor(public http: Http) {
    console.log('Hello HttpServiceProvider Provider');
  }


  login(data){

    let headers = new Headers();
    
    headers.append('cache-control', 'no-cache');
	  headers.append('content-type', ' application/json');
    headers.append('postman-token', 'b408a67d-5f78-54fc-2fb7-00f6e9cefbd1');

	  let options = new RequestOptions({ headers: headers });
     
    
  	let body = {
  	  email: data.email,
        user_password : data.password,
        token : "8109EB47-FE0D-4E65-B8C4-B678B76FD445"
  	}

  	console.log(data); 

  	console.log(body);

   	return this.http.post("https://www.wellingtonsoccer.com/lib/api/auth.cfc?returnFormat=JSON&method=Authenticate",body,options);

  }



  register(data){

      
    let headers = new Headers();
    
    headers.append('cache-control', 'no-cache');
    headers.append('content-type', ' application/json');
    headers.append('postman-token', 'b408a67d-5f78-54fc-2fb7-00f6e9cefbd1');

    let options = new RequestOptions({ headers: headers });
     
    
    let body = {
        email: data.email,
        first_name:data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        password : data.password,
        token : "8109EB47-FE0D-4E65-B8C4-B678B76FD445" 

    }

    console.log(data); 

    console.log(body);

     return this.http.post("https://www.wellingtonsoccer.com/lib/api/auth.cfc?returnFormat=JSON&method=CreateUser",body,options);



  }


  getDashboardData(sToken){
     let headers = new Headers();
    
    headers.append('cache-control', 'no-cache');
    headers.append('content-type', ' application/json');
    headers.append('postman-token', 'b408a67d-5f78-54fc-2fb7-00f6e9cefbd1');

    let options = new RequestOptions({ headers: headers });
     
    
    let body = {
        sessiontoken : sToken,
        token : "8109EB47-FE0D-4E65-B8C4-B678B76FD445"
    }

    console.log(body);

     return this.http.post("https://www.wellingtonsoccer.com/lib/api/auth.cfc?method=GetMyWave&returnFormat=JSON",body,options);
  }




  


  

}
