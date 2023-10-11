import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.css']
})


export class NotificationDropdownComponent implements OnInit{

  @Input('notificationList')
  public notificationList : any;

  ngOnInit(): void {
    console.log("_+_+_+_+_ Value ", this.notificationList);
  }

  public formatTime(updatedTime){
    var date: any = new  Date (updatedTime);

    var todayDate : any = new Date();
    


    let time1:any = date.getHours();
    let time2:any = todayDate.getHours();
    
    let diffTime = time2-time1;


    const milliseconds = Math.abs(date - todayDate);
    const hours = Math.floor(milliseconds / 36e5);
    

    //const hours  = 145;

    if(hours <=24){
      //return (time2-time1) + ' hours ago';
      return (hours) + ' hours ago';

    }
    else{

      //let dayText = (Math.floor(diffTime/24) === 1) ? ' day ago' : ' days ago';
      //return (Math.floor(diffTime/24)) + dayText;
      let dayText = (Math.floor(hours/24) === 1) ? ' day ago' : ' days ago';
      return (Math.floor(hours/24)) + dayText;
    }
    
  }

}
