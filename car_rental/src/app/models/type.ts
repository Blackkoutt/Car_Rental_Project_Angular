export class TypeData {
  private id?: number;
  private name: string;
  private seats_count: number;
  constructor(data: any) {
    this.name = data.name;
    this.seats_count = data.seats_count;
  }
  get Id(): number | undefined {
    return this.id;
  }
  set Id(value: number) {
    this.id = value;
  }
  get Name(): string {
    return this.name;
  }
  set Name(value: string) {
    this.name = value;
  }
  get SeatsCount(): number {
    return this.seats_count;
  }
  set SeatsCount(value: number) {
    this.seats_count = value;
  }
}
