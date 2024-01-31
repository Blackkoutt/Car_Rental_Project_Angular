import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  isAdd: boolean = true;

  openCloseAccordion = (): void => {
    const accordion = document.querySelector(".accordion-content");
    accordion?.classList.toggle("accordion-content_active");
    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        accordion?.classList.remove("accordion-content_active");
      }
    };
    document.addEventListener("keydown", handleEscapeKeyPress);
  };
}
