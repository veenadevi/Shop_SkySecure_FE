import { Component, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePgaeComponent {


  public aboutOurPlatformVideoUrl : any;
  @ViewChildren('elmSearchBox') elms: QueryList<any>;

  detectedElms = [];

  constructor(
    public sanitizer: DomSanitizer,
    private renderer: Renderer2
  ){
    this.renderer.listen('window', 'resize', this.detectElms.bind(this));
    this.renderer.listen('window', 'scroll', this.detectElms.bind(this));
  }

  public ngOnInit() : void {
    
    //this.aboutOurPlatformVideoUrl = this.getSafeUrl("https://www.youtube.com/embed/wsfb6jKE4wI");
    this.aboutOurPlatformVideoUrl = "https://www.youtube.com/embed/LWjxyc4FGGs";

    

  }

  detectElms() {
    const detectedElms : any = [];
    let detectedElmsId : any = [];
    this.elms.forEach((elm, index) => {
      
      if (isInViewport(elm.nativeElement)) {
        console.log("()()() Elements", elm);
      }
      else{
        console.log("()()() Elements Else", elm);
      }
      /*let idStr = 'item'+ elm.nativeElement.id;
      if(){

      }
      if (isInViewport(elm.nativeElement)) {
        
        detectedElms.push(elm.nativeElement.id)
        detectedElmsId.push(idStr);
        document.getElementById(idStr).style.opacity = "1";
        
      }
      else{
        document.getElementById(idStr).style.opacity = "0.2";
      }*/
      
    })
  }


  public getSafeUrl(urlLink){

    return this.sanitizer.bypassSecurityTrustResourceUrl(urlLink);

  }

}

function isInViewport (elm) {
  var elementTop = elm.offsetTop;
  var elementBottom = elementTop + elm.offsetHeight;

  // in this specific case the scroller is document.documentElement (<html></html> node)
  var viewportTop = document.documentElement.scrollTop;
  var viewportBottom = viewportTop + document.documentElement.clientHeight;

  return elementBottom > viewportTop && elementTop < viewportBottom;
}