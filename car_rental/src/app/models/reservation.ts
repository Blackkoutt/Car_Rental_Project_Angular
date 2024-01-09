import { CarData } from "./car-data";
import { UserData } from "./user";

export class Reservation{
    private userId:number;
    private carId:number;
    private start_of_reservation:string;
    private end_of_reservation:string;
    private total_cost:number;
    private user?:UserData;
    private car?: CarData;
    constructor(data:any){
        this.userId = data.userId;
        this.carId = data.carId;
        this.start_of_reservation = data.start_of_reservation;
        this.end_of_reservation = data.end_of_reservation;
        this.total_cost = data.total_cost;
    }

    get Car():CarData|undefined{
        return this.car;
    }
    set Car(value:CarData){
        this.car=value;
    }
    get User():UserData|undefined{
        return this.user;
    } 
    set User(value:UserData){
        this.user=value;
    } 
    get CarId():number{
        return this.carId;
    }
    set CarId(value:number){
        this.carId=value;
    }
    get UserId():number{
        return this.userId;
    }
    set UserId(value:number){
        this.userId=value;
    }
    get Start_of_reservation():string{
        return this.start_of_reservation;
    }
    set Start_of_reservation(value:string){
        this.start_of_reservation=value;
    }
    get End_of_reservation():string{
        return this.end_of_reservation;
    }
    set End_of_reservation(value:string){
        this.end_of_reservation=value;
    }
    get Total_Cost():number{
        return this.total_cost;
    }
    set Total_Cost(value:number){
        this.total_cost=value;
    }
}
/*export class Reservation{
    constructor(
                private id:number,
                private car_id:number,
                private name:string,
                private surname:string,
                private email:string,
                private phoneNumber: number,
                private start_of_reservation:string,
                private end_of_reservation:string,
                private total_cost:number,){}
    get ReservationId():number{
        return this.id;
    }
    get CarId():number{
        return this.car_id;
    }
    set CarId(value:number){
        this.car_id=value;
    }
    get Name():string{
        return this.name;
    }
    set Name(value:string){
        this.name=value;
    }
    get Surname():string{
        return this.surname;
    }
    set Surname(value:string){
        this.surname=value;
    }
    get Email():string{
        return this.email;
    }
    set Email(value:string){
        this.email=value;
    }
    get PhoneNumber():number{
        return this.phoneNumber;
    }
    set PhoneNumber(value:number){
        this.phoneNumber=value;
    }
    get Start_of_reservation():string{
        return this.start_of_reservation;
    }
    set Start_of_reservation(value:string){
        this.start_of_reservation=value;
    }
    get End_of_reservation():string{
        return this.end_of_reservation;
    }
    set End_of_reservation(value:string){
        this.end_of_reservation=value;
    }
    get Total_Cost():number{
        return this.total_cost;
    }
    set Total_Cost(value:number){
        this.total_cost=value;
    }

}*/