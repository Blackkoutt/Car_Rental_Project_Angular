import { ManufacturerData } from "./manufacturer";
import { TypeData } from "./type";

export class CarData{
    private id?:number;
    private manufacturerId:number;
    private typeId: number;
    private type?: TypeData;
    private manufacturer?: ManufacturerData;
    private model:string;
    private date_of_manufacture:string;
    private available_count:number;
    private rental_cost:number;
    private gearbox:boolean;
    constructor(data:any){
        this.manufacturerId = data.manufacturerId;
        this.typeId = data.typeId;
        this.model = data.model;
        this.date_of_manufacture = data.date_of_manufacture;
        this.available_count = data.available_count;
        this.rental_cost = data.rental_cost;
        this.gearbox = data.gearbox;
    }
    get Id():number|undefined{
        return this.id;
    }
    set Id(value:number){
        this.id=value;
    }
    get ManufacturerId():number{
        return this.manufacturerId;
    }
    set ManufacturerId(value:number){
        this.manufacturerId=value;
    }
    get TypeId():number{
        return this.typeId;
    }
    set TypeId(value:number){
        this.typeId=value;
    }
    get Manufacturer():ManufacturerData|undefined{
        return this.manufacturer;
    }
    set Manufacturer(value:ManufacturerData|undefined){
        this.manufacturer = value;
    }
    get Type():TypeData|undefined{
        return this.type;
    }
    set Type(value:TypeData|undefined){
        this.type = value;
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
    get GearBox():boolean{
        return this.gearbox;
    }
    set GearBox(value:boolean){
        this.gearbox=value;
    }
}

/*export class CarData{
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
    }*/
    /*set Id(value:number){
        this.id=value;
    }*/
/*    get Manufacturer():string{
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
}*/