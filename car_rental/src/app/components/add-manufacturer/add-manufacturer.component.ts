import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ManufacturerData } from "src/app/models/manufacturer";
import { FormService } from "src/app/services/form.service";
import { ManufacturerService } from "src/app/services/manufacturer.service";

@Component({
  selector: "app-add-manufacturer",
  templateUrl: "./add-manufacturer.component.html",
  styleUrls: ["./add-manufacturer.component.css"]
})
export class AddManufacturerComponent {
  formModel: FormGroup;
  showErrors: boolean = false;
  showManufacturerExistsError: boolean = false;
  manufacturers: ManufacturerData[] = [];
  constructor(private formService: FormService, private manufacturerService: ManufacturerService, private router: Router) {
    this.formModel = formService.createManufacturerForm();
  }
  ngOnInit() {
    this.manufacturerService.getManufacturers().subscribe((result: any[]) => {
      this.manufacturers = result.map((man: any) => {
        let manufacturer = new ManufacturerData({
          name: man.name
        });
        manufacturer.Id = man.id;
        return manufacturer;
      });
    });
  }
  get controls() {
    return this.formModel.controls;
  }
  showPotentialErrors() {
    this.showErrors = true;
  }
  addManufacturer(event: Event) {
    const formValues = this.formModel.value;
    this.showManufacturerExistsError = false;

    if (this.manufacturers.some((m) => m.Name === formValues.name)) {
      this.showManufacturerExistsError = true;
      event.preventDefault();
      return;
    }
    const man: ManufacturerData = new ManufacturerData({
      name: formValues.name
    });

    this.manufacturerService.createManufacturer(man).subscribe((add_man: ManufacturerData) => {
      console.log("Dodany samochód: ", add_man);
      this.router.navigate([""]);
    });
  }
}
