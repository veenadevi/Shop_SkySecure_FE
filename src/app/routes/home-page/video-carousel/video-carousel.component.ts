import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'video-carousel',
  templateUrl: './video-carousel.component.html',
  styleUrls: ['./video-carousel.component.css']
})
export class VideoCarouselComponent {


  public aboutOurPlatformVideoUrl : any;
  public azurep1VideoUrl: any;
  public azurep2VideoUrl: any;
  public microsoft365InsiderVideoUrl: any;
  public eDiscoveryAuditVideoUrl: any;
  public defenderForIdentityVideoUrl: any;
  public defenderForEndpointp1VideoUrl: any;
  public defenderForEndpointp2VideoUrl: any;
  public defenderForOfficep1VideoUrl: any;
  public defenderForOfficep2VideoUrl: any;

  constructor(
    public sanitizer: DomSanitizer
  ){}





  public ngOnInit() : void {
    
    //this.aboutOurPlatformVideoUrl = this.getSafeUrl("https://www.youtube.com/embed/wsfb6jKE4wI");
    // this.aboutOurPlatformVideoUrl = "https://www.youtube.com/embed/LWjxyc4FGGs";


    this.azurep1VideoUrl = "https://www.youtube.com/embed/wsfb6jKE4wI";
    this.azurep2VideoUrl = "https://www.youtube.com/embed/t1_xFBOjuB4";

    this.microsoft365InsiderVideoUrl = "https://www.youtube.com/embed/I2g6Nq8C5gc";
    this.eDiscoveryAuditVideoUrl = "https://www.youtube.com/embed/V5RsHYa3qOs";
    this.defenderForIdentityVideoUrl = "https://www.youtube.com/embed/Ya0wPo6JvZs";

    this.defenderForOfficep1VideoUrl = "https://www.youtube.com/embed/UKwDpQoPM20";
    this.defenderForOfficep2VideoUrl = "https://www.youtube.com/embed/Ek77bpR7bNI";

    this.defenderForEndpointp1VideoUrl = "https://www.youtube.com/embed/cIKVO9n8t_Q";
    this.defenderForEndpointp2VideoUrl = "https://www.youtube.com/embed/XQa100sFYe4";
  }

  public getSafeUrl(urlLink){

    return this.sanitizer.bypassSecurityTrustResourceUrl(urlLink);

  }


  scrollFunctionRight(){
    let left = document.querySelector(".scroll-content")
    left.scrollBy(400, 0);
  };

  scrollFunctionLeft(){
    let right = document.querySelector(".scroll-content")
    right.scrollBy(-400, 0);
  };



}
