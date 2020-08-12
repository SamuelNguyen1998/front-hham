import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: [ './app-footer.component.scss' ]
})
export class AppFooterComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    const footer = document.getElementsByTagName("footer")[0];
    if (!this.isAtBottom()) {
      const { y, height } = footer.getBoundingClientRect();
      const top = y + window.scrollY;
      const currentContentHeight = top + height;
      footer.style.marginTop = `${+(window.innerHeight - currentContentHeight)}px`;
    }
  }

  isAtBottom(): boolean {
    const footer = document.getElementsByTagName("footer")[0];
    const { y, height } = footer.getBoundingClientRect();
    return y + window.scrollY < window.innerHeight - height;
  }
}
