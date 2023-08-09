import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css']
})
export class ResponsiveToolbarComponent  implements OnInit{


  ngOnInit(): void {

    this.setNavBar();
  }

  public setNavBar(){
    let navbar : HTMLElement = document.querySelector(".navbar");

    // sidebar open close js code
    let navLinks : HTMLElement = document.querySelector(".nav-links");
    let menuOpenBtn : HTMLElement = document.querySelector(".navbar .bx-menu");
    let menuCloseBtn : HTMLElement = document.querySelector(".nav-links .bx-x");



    // sidebar submenu open close js code
    let htmlcssArrow : HTMLElement = document.querySelector(".htmlcss-arrow");
    htmlcssArrow.onclick = function() {
    navLinks.classList.toggle("show1");
    }
    let moreArrow : HTMLElement = document.querySelector(".more-arrow");
    moreArrow.onclick = function() {
    navLinks.classList.toggle("show2");
    }
    let jsArrow : HTMLElement = document.querySelector(".js-arrow");
    jsArrow.onclick = function() {
    navLinks.classList.toggle("show3");
    }
  }
  

}


