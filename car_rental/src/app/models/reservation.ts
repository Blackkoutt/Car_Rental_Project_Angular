export class Reservation{
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

}