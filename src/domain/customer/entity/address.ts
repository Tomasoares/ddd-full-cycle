export default class Address {

    //private
    _street: string;
    _number: number;
    _zip: string;
    _city: string;
    
    constructor(_street: string, _number: number, _zip: string, city: string) {
        this._street = _street;
        this._number = _number;
        this._zip = _zip;
        this._city = city;

        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get zip(): string {
        return this._zip;
    }

    get city(): string {
        return this._city;
    }

    validate(): void {
        if (!this._street) {
            throw new Error("Street is required");
        }

        if (!this._zip) {
            throw new Error("Zip is required");
        }

        if (!this._number) {
            throw new Error("Number is required");
        }

        if (!this._city) {
            throw new Error("City is required");
        }
    }

    toString(): string {
        return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`
    }
}