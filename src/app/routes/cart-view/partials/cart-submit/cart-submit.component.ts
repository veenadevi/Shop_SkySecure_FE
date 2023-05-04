import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-submit',
  templateUrl: './cart-submit.component.html',
  styleUrls: ['./cart-submit.component.css']
})
export class CartSubmitComponent {

  public display : any;

  constructor(
    private router : Router
  ){
    this.timer(5);
  }


  public timer(sec) {
    // let minute = 1;
    //let seconds: number = sec * 60;
    let seconds: number = sec;
    let textSec: any = '0';
    let statSec: number = 5;

    const prefix = sec < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      // else statSec = 59;
      else statSec = 5;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      //this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      this.display = seconds+1;

      if (seconds == 0) {
        clearInterval(timer);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

}
