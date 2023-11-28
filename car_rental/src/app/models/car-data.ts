export class CarData{
    constructor(
                private id:number,
                private manufacturer:string,
                private model:string,
                private date_of_manufacture:string,
                private available_count:number,
                private rental_cost:number,
                private seats_count:number,
                private gearbox:boolean,
                private type:string){}
    get Id():number{
        return this.id;
    }
    /*set Id(value:number){
        this.id=value;
    }*/
    get Manufacturer():string{
        return this.manufacturer;
    }
    set Manufacturer(value:string){
        this.manufacturer=value;
    }
    get Model():string{
        return this.model;
    }
    set Model(value:string){
        this.model=value;
    }
    get DateOfManufacture():string{
        return this.date_of_manufacture;
    }
    set DateOfManufacture(value:string){
        this.date_of_manufacture=value;
    }
    get AvailableCount():number{
        return this.available_count;
    }
    set AvailableCount(value:number){
        this.available_count=value;
    }
    get RentalCost():number{
        return this.rental_cost;
    }
    set RentalCost(value:number){
        this.rental_cost=value;
    }
    get SeatsCount():number{
        return this.seats_count;
    }
    set SeatsCount(value:number){
        this.seats_count=value;
    }
    get GearBox():boolean{
        return this.gearbox;
    }
    set GearBox(value:boolean){
        this.gearbox=value;
    }
    get Type():string{
        return this.type;
    }
    set Type(value:string){
        this.type=value;
    }
}