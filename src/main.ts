import Address from "./domain/customer/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

const address = new Address("Rua", 38, "2837", "Florianopolis");
let customer = new Customer("Tomás Soares", address);
customer.activate();

// Relação customer p/ order -> ID
// Relação OrderItem p/ order -> direta
const item1 = new OrderItem("CD", 10, "", 0);
const item2 = new OrderItem("DVD", 15, "", 0);
const order = new Order(customer.id, [item1, item2]); 