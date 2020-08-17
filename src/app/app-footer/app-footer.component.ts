import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";

@Component({
    selector: 'app-footer',
    templateUrl: './app-footer.component.html',
    styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {
    numberOfPendingUpdates = 0;
    resizeObservable$: Observable<Event>;
    resizeSubscription$: Subscription;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.pad();
            }
        });
        this.pad();
      }
    });
    this.pad();
  }

  pad(): void {
    setTimeout(() => {
      const docHeightWithPad = document.body.scrollHeight;
      const padDiv = document.getElementById("emptyDivToPadBeforeFooterOnShortPage");
      const currentPadHeight = padDiv.getBoundingClientRect().height;
      const realDocHeight = docHeightWithPad - currentPadHeight;
      const padHeightRequired = window.innerHeight - realDocHeight;
      if (padHeightRequired > 0) {
        padDiv.style.height = `${ padHeightRequired }px`;
      }
    }, 100);
  }

  @HostListener('body:resize')
  onWindowResize(): void {
    this.pad();
  }
}
