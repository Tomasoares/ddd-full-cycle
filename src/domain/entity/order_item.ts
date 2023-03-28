import {v4 as uuidV4} from 'uuid';

export default class OrderItem {

   private _id: string;
   private _productId: string;
   private _name: string;
   private _price: number;
   private _quantity: number;

    constructor(name: string, price: number, productId: string, quantity: number, id?: string) {

        if (id == null) {
            this._id = uuidV4();
        } else {
            this._id = id;
        }
        
        this._productId = productId;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this.validate();
    }

    validate() {
        if (this._quantity <= 0) {
            throw new Error("Order item quantity must be greater than 0");
        }
    }

    get id() {
        return this._id;
    }

    get price(): number {
        return this._price;
    }

    get quantity(): number {
        return this._quantity;
    }

    get name(): string {
        return this._name;
    }

    get productId(): string {
        return this._productId;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

}