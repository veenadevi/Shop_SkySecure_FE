import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'super-admin-page',
  templateUrl: './super-admin-page.component.html',
  styleUrls: ['./super-admin-page.component.css']
})
export class SuperAdminPageComponent implements OnInit{


  constructor(
    private router : Router
  ){}

  public ngOnInit(): void {

  
    
  }

  public navigate(val : String){
    this.router.navigate(['/super-admin-page/accounts']);
  }

}
