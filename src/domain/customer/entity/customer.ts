import {v4 as uuidV4} from 'uuid';
import Address from './address';

export default class Customer {

    private _id: string;
    private _name: string;
    private _address?: Address;
    private _active: boolean;
    private _rewardPoints: number;

    constructor(name: string, address?: Address, id?: string) {
        this.validateName(name);

        if (id == null) {
            this._id = uuidV4();
        } else {
            this._id = id;
        }

        this._name = name;
        this._address = address;
        this._active = false;
        this._rewardPoints = 0;
    }

    get name(): string {
        return this._name;
    }

    get active(): boolean {
        return this._active;
    }

    public get id() : string {
        return this._id;
    }

    public get rewardPoints(): number {
        return this._rewardPoints;
    }

    public get address() : Address {
        return this._address;
    }
    
    changeName(name: string) {
        this.validateName(name);
        this._name = name;
    }

    private validateName(name: string) {
        if (!name || name.length === 0) {
            throw new Error("Name cannot be empty.");
        }
    }

    activate() {
        this.doesAddressExist(); 
        this._active = true;
    }

    private doesAddressExist() {
        if (!this._address) {
            throw new Error("Address is required to activate customer.");
        }
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(productPrice: number) {
        this._rewardPoints += (productPrice/2);
    }
}