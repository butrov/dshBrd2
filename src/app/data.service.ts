import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, from } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';

function randomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

import { MeteoMsg, Msg1 } from './meteo-data';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "https://my-json-server.typicode.com/butrov/dashBrd/";
  //private REST_API_SERVER = "http://doprtr.intech.ru:5050/httpproxy/192.168.8.137:4125/MeteoSrv/Service1.asmx/getMeteoData";
  constructor(private httpClient: HttpClient) { }
  // promiseSrc = getMeteoData_2();
  // private observableFromPromise =  from(promiseSrc);
  public sendGetRequest(){
    const request_indx:string = randomInt(1,5);
    // const options = { params: 
    //           new HttpParams({fromString: "page=1&_limit=4"})
    //           , observe: "response"
    // };

    //this.httpClient.get<Msg1[]>() - Убрал, пока данные получаю со своего
    // вебсервиса, который отдает данные как <xml>{..}</xml>
     return this.httpClient
     .get(this.REST_API_SERVER + request_indx, 
      { params: new HttpParams({fromString: ""}) //_page=1&_limit=6
      , observe: "response"
      //, responseType:'text'
      }
      
      //options
      )
     .pipe(
          retry(3)
        , catchError(this.handleError)
        , tap(res => {
            //debugger;
            console.log(res);
            //console.log(res.headers.get('Link'));
            //this.parseLinkHeader(res.headers.get('Link'));
          }
        )
        // ,map(x=>{
        //   const json1 = x.body.replace(/<[^>]+>/g,"");
        //   const ob1 = JSON.parse(json1);
        //   return ob1;
        // })
      );
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  parseLinkHeader(header) {
    if (header.length == 0) {
    return ;
    }
    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
     });
    
    //  this.first = links["first"];
    //  this.last = links["last"];
    //  this.prev = links["prev"];
    //  this.next = links["next"];
  }
}
