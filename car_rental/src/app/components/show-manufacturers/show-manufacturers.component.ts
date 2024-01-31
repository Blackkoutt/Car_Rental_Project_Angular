import { Component, ElementRef, ViewChild } from "@angular/core";
import { ManufacturerData } from "src/app/models/manufacturer";
import { ManufacturerService } from "src/app/services/manufacturer.service";

@Component({
  selector: "app-show-manufacturers",
  templateUrl: "./show-manufacturers.component.html",
  styleUrls: ["./show-manufacturers.component.css"]
})
export class ShowManufacturersComponent {
  @ViewChild("deleteDialog") deleteDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild("successDialog") successOrExceptionDialog!: ElementRef<HTMLDialogElement>;
  manufacturers: ManufacturerData[] = [];

  constructor(private manService: ManufacturerService) {}

  ngOnInit(): void {
    this.manService.getManufacturers().subscribe((result: any[]) => {
      this.manufacturers = result.map((man: any) => {
        let manufacturer: ManufacturerData = new ManufacturerData({
          name: man.name
        });
        manufacturer.Id = man.id;
        return manufacturer;
      });
    });
  }

  ShowDialog(man: ManufacturerData) {
    const dialog = this.deleteDialog.nativeElement;
    const info = dialog.querySelector("p");
    if (info) {
      info.textContent = `Czy napewno chcesz usunąć producenta ${man.Name} ?`;
    }
    dialog.showModal();
    dialog.onreset = () => {
      dialog.close();
    };
    dialog.onsubmit = () => {
      this.DeleteManufacturer(man);
    };
  }

  DeleteManufacturer(man: ManufacturerData) {
    console.log("tu");
    console.log(man);
    this.manService.deleteManufacturer(man).subscribe({
      next: (response) => {
        console.log("Usunięto samochód pomyślnie:", response);
        this.manufacturers = this.manufacturers.filter((m) => m !== man);
        this.ShowSuccessOrExceptionDialog(`Pomyślnie usunięto producenta ${man.Name}`);
      },
      error: (error) => {
        console.error("Błąd podczas usuwania producenta:", error);
        this.ShowSuccessOrExceptionDialog(`Wystąpił błąd podczas usuwania producenta`);
      }
    });
  }
  ShowSuccessOrExceptionDialog(message: string) {
    const dialog = this.successOrExceptionDialog.nativeElement;
    const info = dialog.querySelector("p");
    if (info) {
      info.textContent = message;
    }

    dialog.showModal();
    setTimeout(() => {
      dialog.close();
    }, 1500);
  }
}
