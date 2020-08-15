import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: [ './app-footer.component.scss' ]
})
export class AppFooterComponent implements OnInit {
  numberOfPendingUpdates = 0;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(document, "resize");
    this.resizeSubscription$ = this.resizeObservable$
      .pipe(debounceTime(100))
      .subscribe(event => this.pad());
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }

  pad(): void {
    this.numberOfPendingUpdates += 1;
    setTimeout(() => {
      const docHeightWithPad = document.body.scrollHeight;
      const padDiv = document.getElementById("emptyDivToPadBeforeFooterOnShortPage");
      const currentPadHeight = padDiv.getBoundingClientRect().height;
      const realDocHeight = docHeightWithPad - currentPadHeight;
      const padHeightRequired = window.innerHeight - realDocHeight;
      if (padHeightRequired > 0) {
        padDiv.style.height = `${ padHeightRequired }px`;
      }
      this.numberOfPendingUpdates -= 1;
    }, this.numberOfPendingUpdates * 100);
  }
}
