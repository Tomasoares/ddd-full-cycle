import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default class OrderService {

    static calculateTotal(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
        const order = new Order(customer.id, orderItems);
        customer.addRewardPoints(order.total());
        return order;
    }
}