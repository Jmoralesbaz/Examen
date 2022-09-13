import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ParamsRequest } from '../Models/params-request';
@Injectable({
  providedIn: 'root'
})
export class BaseServicioService {
  private endPoint:string='';
  protected isEndPointRfc:boolean=false;
  protected pathService:string='';
  protected result:any;
  constructor(protected http: HttpClient){
      this.endPoint= environment.endPoint;      
  }     
  
  protected Get<TSalida>(method:string,query:ParamsRequest[]=[]):Observable<TSalida>{
    let queryUrl = '?';
    query.forEach(f=>{
      queryUrl += f.name+'='+f.value+'&';
    });
    return this.http.get<TSalida>(this.endPoint+this.pathService+method+queryUrl.substring(0,queryUrl.length-1));
  }

  protected Post<TSalida,TDatos>(method:string,datos:TDatos):Observable<TSalida>{
    return this.http.post<TSalida>(this.endPoint+this.pathService+method,datos);
  }
  protected Put<TSalida,TDatos>(method:string,datos:TDatos):Observable<TSalida>{
    return this.http.put<TSalida>(this.endPoint+this.pathService+method,datos);
  }
  protected Delete<TSalida>(method:string):Observable<TSalida>{
    return this.http.delete<TSalida>(this.endPoint+this.pathService+method);
  }
}
