import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePgaeComponent {


  public aboutOurPlatformVideoUrl : any;

  constructor(
    public sanitizer: DomSanitizer
  ){}

  public ngOnInit() : void {
    
    //this.aboutOurPlatformVideoUrl = this.getSafeUrl("https://www.youtube.com/embed/wsfb6jKE4wI");
    this.aboutOurPlatformVideoUrl = "https://www.youtube.com/embed/LWjxyc4FGGs";

  }

  public getSafeUrl(urlLink){

    return this.sanitizer.bypassSecurityTrustResourceUrl(urlLink);

  }

}