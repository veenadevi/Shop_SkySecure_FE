import { Injectable }           from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingType } from '../constants/loading-type.enum'; 

@Injectable()
export class LoaderService {
  private requests = new Map<LoadingType, number | undefined>([
    [LoadingType.Full, 0],
    [LoadingType.Table, 0]
  ]);

  private loading = new Map<LoadingType, BehaviorSubject<boolean>>([
    [LoadingType.Full, new BehaviorSubject<boolean>(false)],
    [LoadingType.Table, new BehaviorSubject<boolean>(false)]
  ]);

  public loading$ = new Map<LoadingType, Observable<boolean>>([
    [LoadingType.Full, this.loading.get(LoadingType.Full)!.asObservable()],
    [LoadingType.Table, this.loading.get(LoadingType.Table)!.asObservable()]
  ]);

  constructor() { }

  ////////////////////////////////////////////////
  // Public Methods
  ////////////////////////////////////////////////

  /**
   * Loading Interceptor will change the subject value to true, when a request starts
   */
  public show(type: LoadingType): void {
    this.requests.set(type, this.requests.get(type)! + 1 );

    this.loading.get(type)!.next(true);
  }

  /**
   * Loading Interceptor will “hide” it when the request is “finalized”
   */
  public hide(type: LoadingType): void {
    if (this.requests.get(type)! > 0) {
      this.requests.set(type, this.requests.get(type)! - 1);
    }

    if (this.requests.get(type) == 0) {
      this.loading.get(type)!.next(false);
    }
  }
}