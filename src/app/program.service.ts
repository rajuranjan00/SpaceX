import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private readonly http: HttpClient) { }

getAll(url){
return this.http.get<any>(url);
   }
}