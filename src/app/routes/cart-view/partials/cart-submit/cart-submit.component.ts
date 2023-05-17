import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-submit',
  templateUrl: './cart-submit.component.html',
  styleUrls: ['./cart-submit.component.css']
})
export class CartSubmitComponent {

  public display : any;

  public timer;

  constructor(
    private router : Router
  ){
    this.timerFunc(5);
  }


  public navigateTo(url){
    this.clearTimer();
    this.router.navigate([url]);
  }

  public timerFunc(sec) {
    // let minute = 1;
    //let seconds: number = sec * 60;
    let seconds: number = sec;
    let textSec: any = '0';
    let statSec: number = 5;

    const prefix = sec < 10 ? '0' : '';

    this.timer = setInterval(() => {
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
        clearInterval(this.timer);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  public clearTimer(){
    clearInterval(this.timer);
  }

}
