import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl="http://localhost:50945/api";
readonly PhotoUrl = "http://localhost:50945/Photos/";

  constructor(private http:HttpClient) { }


  getPedList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/personaldetails');
  }

  addPerson(val:any){
    return this.http.post(this.APIUrl+'/personaldetails',val);
  }

  updatePerson(val:any){
    return this.http.put(this.APIUrl+'/personaldetails',val);
  }

  deletePerson(val:any){
    return this.http.delete(this.APIUrl+'/personaldetails/'+val);
  }


  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/personaldetails/savefile',val);
  }

  getAllPersonalDetails():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/personaldetails/GetAllPersonalDetails');
  }

}
