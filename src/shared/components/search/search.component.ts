import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { Subject } from 'rxjs';
import { GlobalSearchService } from 'src/shared/services/global-search.service';

@Component({
  selector: 'search-box',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  public isOpen = false;
  public keywordSearchOpen = false;
  public generalSearchOpen = false;

  private searchSubscription?: Subscription;
  private searchSubject = new Subject<string | undefined>();

  constructor(
    private globalSearchSvc : GlobalSearchService
  ) { }

  public onSearchClicked() {
    console.log("Show");
    this.isOpen = true;
    this.generalSearchOpen = true;
  }

  public onFocusOutEvent(event: any){
    console.log(event.target.value);
    this.isOpen = false;
    this.generalSearchOpen = false;
    this.keywordSearchOpen = false;
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
      console.log("*** results ", results);
      if(results.length>2){
        this.generalSearchOpen = false;
        this.keywordSearchOpen = true;
        this.globalSearchSvc.fetchSearchResults(results).subscribe(res => {
          console.log("&&&& Resp");
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

}
