import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should generate id", () => {
        let order = new Order("12", [new OrderItem("", 0, "", 1)]);
        expect(order.id).toBeDefined();
    });

    it("throw error when customer id is blank", () => {
        expect(() => { new Order("", [new OrderItem("", 0, "", 1)]);
        }).toThrowError("Customer ID is required");
    });

    it("throw error when order has no items", () => {
        expect(() => { new Order("12", []);
        }).toThrowError("Order must have items");
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("1", 10, "", 2);
        const item2 = new OrderItem("1", 20, "", 2);
        const order = new Order("12", [item1, item2]);

        expect(order.total()).toBe(60);
    });

    it("should check if the item quantity is greater than 0", () => {
        expect(() => { new OrderItem("1", 10, "", 0);;
        }).toThrowError("Order item quantity must be greater than 0");
    });
});