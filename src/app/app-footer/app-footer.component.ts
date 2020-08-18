import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: [ './app-footer.component.scss' ]
})
export class AppFooterComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.pad();
    this.router.events.subscribe(event => {
      // If a navigation happens...
      if (event instanceof NavigationEnd) {
        // ...then trigger footer repositioning
        document.body.dispatchEvent(new Event('resize'));
      }
    });
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
