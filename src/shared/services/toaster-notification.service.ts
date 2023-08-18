import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterNotificationService {
  

  constructor(private toastr: ToastrService) { }

  
  showSuccess(message, title){
      this.toastr.success(message, title)
      
  }
  
  showError(message, title){
      this.toastr.error(message, title)
  }
  
  showInfo(message, title){
      this.toastr.info(message, title,{
      timeOut:5000,
        closeButton:true
      })
  }
  
  showWarning(message, title){
      this.toastr.warning(message, title,{
         timeOut:5000,
           closeButton:true
         })
  }
}
