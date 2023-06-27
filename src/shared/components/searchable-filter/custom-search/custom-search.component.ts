import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-custom-search',
  templateUrl: './custom-search.component.html',
  styleUrls: ['./custom-search.component.css']
})
export class CustomSearchComponent {
  searchInput: FormControl = new FormControl();
  @Input() placeholder = "Search";
  @Output() search = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(text => {
        this.search.emit(text);
      });
  }


}
