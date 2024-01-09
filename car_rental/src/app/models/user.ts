export class UserData{
    private id?:number
    private name:string
    private surname:string
    private email:string
    private phone_number:number
    constructor(data:any){
        this.name = data.name,
        this.surname = data.surname,
        this.email = data.email,
        this.phone_number = data.phone_number
    }
    get Id():number|undefined{
        return this.id;
    }
    set Id(value:number){
        this.id=value;
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
        return this.phone_number;
    }
    set PhoneNumber(value:number){
        this.phone_number=value;
    }
    
}