import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { throwError, from, of, Observable } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { MeteoValue, MeteoDataTable, ReqMeteo, MeteoErr, MeteoStamp } from './meteo-data';

function randomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable({
  providedIn: 'root'
})
export class MeteoDataService {
  //private REST_API_SERVER = "https://my-json-server.typicode.com/butrov/dashBrd/";
  private REST_API_SERVER = "https://app-srvhello1.herokuapp.com/";
  ///  "/dashBrd/*": {
  ///  "target": "https://my-json-server.typicode.com/butrov",
  //private REST_API_SERVER = "/dashBrd/";
  //private REST_API_SERVER = "http://doprtr.intech.ru:5050/httpproxy/192.168.8.137:4125/MeteoSrv/Service1.asmx/getMeteoData";
  /// "/getMeteoData/*": {
  ///  "target": "http://doprtr.intech.ru:5050/httpproxy/192.168.8.137:4125/MeteoSrv/Service1.asmx",
  //private REST_API_SERVER = "http://localhost:4126/getMeteoData";
  // private REST_API_SERVER = "/getMeteoData";
  //private REST_API_SERVER = "/api/";
  //private httpClient: HttpClient
  
  constructor(private httpClient: HttpClient) { }
  public sendGetRequest(){
    const request_indx:string = randomInt(1,5);
    //this.httpClient.get<Msg1[]>() - Убрал, пока данные получаю со своего
    // вебсервиса, который отдает данные как <xml>{..}</xml>
     return this.httpClient //<MeteoDataTable[]>
      .get(this.REST_API_SERVER + request_indx, 
            { params: new HttpParams({fromString: ""}) //_page=1&_limit=6
            , observe: "response"
            //, responseType:'text'
            }
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
        ,map(
          x=> { 
            const d1: MeteoDataTable[] = [];
            d1.push({num: 2,regname:"string2",name:"string2",value: "string22",measure:"str" })
            d1.push({num: 3,regname:"string3",name:"string2",value: "string22",measure:"str" })
            debugger;
             //return {num: 2,regname:"string2",name:"string2",value: "string22",measure:"str" }
             return d1; 
             
          }
        )
        // ,map(x=>{
        //   const json1 = x.body.replace(/<[^>]+>/g,"");
        //   const ob1 = JSON.parse(json1);
        //   return ob1;
        // })
      );
  }
  public sendGetRequest_Text(n:string):Observable<ReqMeteo>{
    let request_indx:string = ""; //randomInt(1,5);
    //this.httpClient.get<Msg1[]>() - Убрал, пока данные получаю со своего
    // вебсервиса, который отдает данные как <xml>{..}</xml>
    // var obBaseHref = document.getElementById("myBase");
    // var x = obBaseHref["href"] || "";
    // if (x){
    //   x = x.replace(/\/$/,"")
    // }
    // var myBaseHref = x;

    request_indx += n;
    //console.log("myBaseHref: "+myBaseHref)
    console.log("REST_API_SERVER: "+this.REST_API_SERVER + request_indx)
     return this.httpClient //<MeteoDataTable[]>
      .get(this.REST_API_SERVER + request_indx, 
            { params: new HttpParams({fromString: ""}) //_page=1&_limit=6
            , observe: "response" 
            , responseType:'text'
            }
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
        ,map(
          x1=> {
            console.log(x1);
            const mt = new MeteoStamp();
            const r1:ReqMeteo={meteo:[],err:""}; 
              const d1: MeteoDataTable[] = [];
              d1.push({num: 2,regname:"string2",name:"string2",value: "string22",measure:"str" })
              d1.push({num: 3,regname:"string3",name:"string2",value: "string22",measure:"str" })
              //const x:MeteoDataTable[]= x1.body .meteo;
              debugger;
              r1.meteo=d1;
              if (x1.status==200){
                let ob1;
                if (false){ // получена строка xml.json
                  const json1 = x1.body.replace(/<[^>]+>/g,"");
                  ob1 = JSON.parse(json1);
                }
                else{
                  ob1 = JSON.parse(x1.body);
                }
                if (ob1 && ob1.Meteo2_state ){
                  if (ob1.Meteo2_state.errBlockMeteo1 || ob1.Meteo2_state.errBlockMeteo2){
                    r1.err = ob1.Meteo2_state.errBlockMeteo1 || ob1.Meteo2_state.errBlockMeteo2;    
                  }
                  else{
                    const res1 = ob1;
                    ["Meteo1","Meteo2"].forEach((meteoProp,indxM)=>{
                      let meteo1 = res1?.[meteoProp];
                      if (meteo1){
                        Object.keys(meteo1).forEach((key,indx)=>{
                          mt.setValue(key,meteo1[key]);  
                        });
                      }
                    });
                  }
                }
              }
              else{
                r1.err = x1.statusText;
              }
              if (!r1.err) r1.meteo=mt.getMeteoDataTable();
            return r1;
          }
          // { 
          //     const x:MeteoDataTable[]= x1.meteo;
          //     // данные с вебсервиса, который отдает данные как <xml>{..}</xml>
          //     const json1 = x.body.replace(/<[^>]+>/g,"");
          //     const ob1 = JSON.parse(json1);
          //     //return ob1;
          //   const d1: MeteoDataTable[] = [];
          //   d1.push({num: 2,regname:"string2",name:"string2",value: "string22",measure:"str" })
          //   d1.push({num: 3,regname:"string3",name:"string2",value: "string22",measure:"str" })
          //   debugger;
          //    //return {num: 2,regname:"string2",name:"string2",value: "string22",measure:"str" }
          //    //return d1; 
          //    return x1; 
             
          // }
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
    console.log(error);
    const defResp = {statusText:"",body:"",status:error.status};
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    defResp.statusText = errorMessage;
    //window.alert(errorMessage);
    //return throwError(errorMessage);
    
    const s2: HttpResponse<string> = new HttpResponse(defResp);
    return of(s2);
    //return errorMessage;
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