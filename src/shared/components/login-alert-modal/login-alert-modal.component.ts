import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/shared/services/login.service';

@Component({
  selector: 'login-alert-modal',
  templateUrl: './login-alert-modal.component.html',
  styleUrls: ['./login-alert-modal.component.css']
})
export class LoginAlertModalComponent {

  @Input('request')
  public request : any;

  constructor(
    public activeModal: NgbActiveModal,
    private router : Router,
    private loginService : LoginService
    ) { }


    public modalCLick(val : String) {

      if(val === 'login'){
        //this.activeModal.close(this.loginService.login());
        //console.log("()()()() ", this.request);
        this.activeModal.close(this.router.navigate(['login'], {queryParams: this.request}));
      }
      else{
        this.activeModal.close();
      }

      
    }
    

}
