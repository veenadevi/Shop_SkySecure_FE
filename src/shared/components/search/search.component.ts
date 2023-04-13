import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { Subject } from 'rxjs';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { GlobalSearchService } from 'src/shared/services/global-search.service';
import { SearchResultStore } from 'src/shared/stores/search-results.store';

@Component({
  selector: 'search-box',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  public isOpen = false;
  public keywordSearchOpen = false;
  public generalSearchOpen = false;

  public inputText = '';
  private searchSubscription?: Subscription;
  private searchSubject = new Subject<string | undefined>();

  public searchResults : [];

  constructor(
    private globalSearchSvc : GlobalSearchService,
    private searchResultsStore : SearchResultStore
  ) { }

  public onSearchClicked() {
    
    if(this.inputText && this.inputText.length>2){
      this.isOpen = true;
      this.generalSearchOpen = false;
      this.keywordSearchOpen = true;
    }
    else{
      this.isOpen = true;
      this.generalSearchOpen = true;
    }
    
  }

  public onFocusOutEvent(event: any){
    

    setTimeout(()=>{  
      this.isOpen = false;
      this.generalSearchOpen = false;
      this.keywordSearchOpen = false;                    
      
    }, 300);

    // this.isOpen = true;
    // this.generalSearchOpen = false;
    // this.keywordSearchOpen = true
  }

  public onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  public getSearchResults() {
    this.searchSubscription = this.searchSubject
    .pipe(
      debounceTime(600),
      distinctUntilChanged(),
    )
    .subscribe((results) => {
      if(results.length>2){
        this.generalSearchOpen = false;
        this.globalSearchSvc.fetchSearchResults(results).subscribe(res => {
          this.searchResults = res;
          this.searchResultsStore.setSearchResults(this.searchResults);
          this.keywordSearchOpen = true;
        });
      }
      else{
        this.generalSearchOpen = true;
        this.keywordSearchOpen = false;
      }

    });
  }

  public ngOnInit() : void {

    this.getSearchResults();
    
  }

  public mouseInside(event : any){
    
    event.preventDefault();
  }

}
