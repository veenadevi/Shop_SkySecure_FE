import { Component, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MetadataStore } from 'src/shared/stores/metadata.store';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePgaeComponent {


  public aboutOurPlatformVideoUrl : any;
  @ViewChildren('elmSearchBox') elms: QueryList<any>;

  detectedElms = [];

  public elementVisible : boolean = true;

  constructor(
    public sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private metadataStore : MetadataStore
  ){
    this.renderer.listen('window', 'resize', this.detectElms.bind(this));
    this.renderer.listen('window', 'scroll', this.detectElms.bind(this));
  }

  public ngOnInit() : void {
    
    //this.aboutOurPlatformVideoUrl = this.getSafeUrl("https://www.youtube.com/embed/wsfb6jKE4wI");
    this.aboutOurPlatformVideoUrl = "https://www.youtube.com/embed/LWjxyc4FGGs?rel=0";
    this.metadataStore.setGlobalSearchBarVisibility('T');

    

  }

  detectElms() {
    const detectedElms : any = [];
    let detectedElmsId : any = [];
    this.elms.forEach((elm, index) => {
      
      if (isInViewport(elm.nativeElement)) {
        this.elementVisible = true;
        this.metadataStore.setGlobalSearchBarVisibility('T');
      }
      else{
        
        this.elementVisible = false;
        this.metadataStore.setGlobalSearchBarVisibility('F');
      }
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