import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            new Customer("", undefined);
        }).toThrowError("Name cannot be empty");
    });

    it("should allow to change name", () => {
        let customer = new Customer("test", undefined);
        customer.changeName("Tomas")

        expect(customer.name).toBe("Tomas");
    });

    it("should throw error when name is changed to null", () => {
        let customer = new Customer("test", undefined);

        expect(() => { customer.changeName("")
        }).toThrowError("Name cannot be empty");
    });

    it("should allow customer activation", () => {
        let customer = new Customer("test", new Address("1", 2, "3", "4"));
        customer.activate()

        expect(customer.active).toBeTruthy();
    });

    it("should allow customer activation", () => {
        let customer = new Customer("test", undefined);
        
        expect(() => customer.activate())
            .toThrowError("Address is required to activate customer.")
    });

    it("should allow customer activation", () => {
        let customer = new Customer("test", new Address("1", 2, "3", "4"));
        customer.activate()

        expect(customer.active).toBeTruthy();

        customer.deactivate();
        
        expect(customer.active).toBeFalsy();
    });

    it("should initialize with 0 points", () => {
        const customer = new Customer("Customer 1", undefined);
        expect(customer.rewardPoints).toBe(0);
    });

    it("should add reward points", () => {
        const customer = new Customer("Customer 1", undefined);
        customer.addRewardPoints(10);
        customer.addRewardPoints(20);

        expect(customer.rewardPoints).toBe(15);
    });

});

