import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import Product from "../entity/product";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should totalize the value of all orders", () => {
        const i1 = new OrderItem("name1", 10, "1", 20);
        const i2 = new OrderItem("name2", 20, "1", 5);
        const o1 = new Order("1", [i1, i2]);  

        const i3 = new OrderItem("name3", 5, "1", 10);
        const o2 = new Order("1", [i3]);  


        const total = OrderService.calculateTotal([o1, o2]);


        expect(total).toBe(350);
    });
    
    it("should place an order", () => {
        const customer = new Customer("name", undefined)
        const item1 = new OrderItem("name1", 5, "1", 10);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(25);
        expect(order.total()).toBe(50);
    });
});