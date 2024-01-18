import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { CarData } from "../models/car-data";

@Directive({
  selector: "[appChangeEditButton]"
})
export class ChangeEditButtonDirective {
  @Input() carInput?: CarData;
  @Output() outputCarEvent: EventEmitter<CarData | undefined> = new EventEmitter();

  private static previousElement: ElementRef | null = null;
  edit_shown: boolean = false;

  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {}
  changeLook(): void {
    console.log("Edycja: ", this.edit_shown);
    if (this.edit_shown) {
      if (ChangeEditButtonDirective.previousElement != null) {
        ChangeEditButtonDirective.previousElement.nativeElement.textContent = "Modyfikuj";
        ChangeEditButtonDirective.previousElement.nativeElement.style =
          "background:linear-gradient(90deg, rgb(1, 106, 1), transparent) rgb(34, 213, 17)";
      }
      this.element.nativeElement.textContent = "Ukryj";
      ChangeEditButtonDirective.previousElement = this.element;
      this.element.nativeElement.style =
        "background:linear-gradient(90deg, rgb(1, 32, 117), transparent) rgb(17, 115, 213)";
      // change color
    } else {
      this.element.nativeElement.textContent = "Modyfikuj";
      this.element.nativeElement.style =
        "background:linear-gradient(90deg, rgb(1, 106, 1), transparent) rgb(34, 213, 17)";
      // change color
    }
  }
  @HostListener("click") onClick() {
    if (ChangeEditButtonDirective.previousElement === this.element) {
      this.edit_shown = !this.edit_shown;
    } else {
      this.edit_shown = true;
    }
    this.changeLook();
    if (!this.edit_shown) {
      this.outputCarEvent.emit(undefined);
    } else {
      this.outputCarEvent.emit(this.carInput);
    }
  }
}
