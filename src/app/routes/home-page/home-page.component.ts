import { Component, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetFreeCallModalComponent } from 'src/shared/components/modals/get-free-call-modal/get-free-call-modal.component';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { CompareProductsModalComponent } from 'src/shared/components/modals/compare-products-modal/compare-products-modal.component';

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
    private metadataStore : MetadataStore,
    private modalService : NgbModal
  ){
    this.renderer.listen('window', 'resize', this.detectElms.bind(this));
    this.renderer.listen('window', 'scroll', this.detectElms.bind(this));
  }

  public ngOnInit() : void {
    
    //this.aboutOurPlatformVideoUrl = this.getSafeUrl("https://www.youtube.com/embed/wsfb6jKE4wI");
    this.aboutOurPlatformVideoUrl = "https://www.youtube.com/embed/LWjxyc4FGGs?rel=0";
    this.metadataStore.setGlobalSearchBarVisibility('T');

    // this.compareProductsLength$.subscribe();


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

  public showBasicDialog() {
    //this.displayBasic = true;
    this.viewModal(null);
  }

  public viewModal3(queryParams) {
    const modalRef = this.modalService.open(CompareProductsModalComponent, {windowClass: 'compare-products-modal-custom-class' });
    modalRef.componentInstance.request = queryParams;
    // this.modalService.open(modal_id, { windowClass: 'custom-class' });
  }
  
  public viewModal(req) {
    const modalRef = this.modalService.open(GetFreeCallModalComponent);
    modalRef.componentInstance.request = req;
  }

}

  // /* compare products length display */
  // public  prdLength = 0;

  // public compareProductsLength$ = this.compareProductsStore.compareProductsList$
  //   .pipe(
  //     map(data => {

  //       let cachedData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
  //       let cachedData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
  //       let combinedData = [...cachedData, ...cachedData2];
  //       let uniqueElements = [...new Map(cachedData.map(item => [item['_id'], item])).values()];
  //       this.prdLength = uniqueElements.length;

  //       console.log("++++++++++++++++++++++ ", this.prdLength);
        
  //       if(data){
  //         return data;
  //       }
  //       else{
  //         return data;
  //       }
        
  //     }
  //     )
  //   )



function isInViewport (elm) {
  var elementTop = elm.offsetTop;
  var elementBottom = elementTop + elm.offsetHeight;

  // in this specific case the scroller is document.documentElement (<html></html> node)
  var viewportTop = document.documentElement.scrollTop;
  var viewportBottom = viewportTop + document.documentElement.clientHeight;

  return elementBottom > viewportTop && elementTop < viewportBottom;
}