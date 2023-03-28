import {v4 as uuidV4} from 'uuid';
import OrderItem from "./order_item";

export default class Order {

    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number;

    constructor(customerId: string, items: OrderItem[], id?: string) {

        if (id == null) {
            this._id = uuidV4();
        } else {
            this._id = id;
        }

        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    validate(): void {
        if (!this._customerId) {
            throw new Error("Customer ID is required");
        }
        
        if (this._items.length == 0) {
            throw new Error("Order must have items");
        }
    }

    public get id() : string {
        return this._id;
    }

    public get customerId() : string {
        return this._customerId;
    }

    public get items() : OrderItem[] {
        return this._items;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }

}