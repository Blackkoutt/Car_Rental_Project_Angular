import { Directive, ElementRef, HostListener, Input, ViewChild } from "@angular/core";

@Directive({
  selector: "[appScrollTo]"
})
export class ScrollToDirective {
  @ViewChild("content") contentElement!: ElementRef;
  @Input() elementDOM: string = "";

  constructor(private element: ElementRef) {}

  scrollTo() {
    const scroll2Element = document.querySelector(this.elementDOM);
    if (scroll2Element) {
      scroll2Element.scrollIntoView({ behavior: "smooth" });
    }
  }
  @HostListener("click") onClick() {
    this.scrollTo();
  }
}
