import {v4 as uuidV4} from 'uuid';

export default class Product {

    private _id: string;
    private _name: string;
    private _price: number;

    public constructor(name: string, price: number, id?: string) {

        if (!id) {
            this._id = uuidV4();
        } else {
            this._id = id;
        }
        
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate(): void {
        if (!this._name) {
            throw new Error("Name cannot be empty");
        }

        if (this._price < 0) {
            throw new Error("Price cannot be negative");
        }
    }
    
    public get id() : string {
        return this._id;
    }
    
    public get name() : string {
        return this._name;
    }

    public get price() : number {
        return this._price;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    readjustPrice(percentage: number): void {
        this.changePrice(this._price + (this._price * (percentage/100)));
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }
}