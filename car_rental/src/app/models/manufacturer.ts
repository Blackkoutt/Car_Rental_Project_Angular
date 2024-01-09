export class ManufacturerData{
    private id?:number;
    private name:string;
    constructor(data:any){
        this.name = data.name
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
    
}