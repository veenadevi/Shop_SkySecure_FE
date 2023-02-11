import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({ providedIn: 'root' })
export class HomePageService {
  private baseUri: string;


  constructor(
    private http: HttpClient,
  ) {
    
    
  }


}