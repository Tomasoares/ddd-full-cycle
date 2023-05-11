import { Sequelize} from "sequelize-typescript";
import Address from "../../../domain/customer/entity/address";
import CustomerModel from "../../customer/repository/sequelize/model/customer.model";
import OrderModel from "./sequelize/model/order.model";
import ProductModel from "../../product/repository/sequelize/model/product.model";
import OrderRepository from "./order.repository";
import OrderItemModel from "./sequelize/model/order-item.model";
import Order from "../../../domain/checkout/entity/order";
import OrderItem from "../../../domain/checkout/entity/order_item";
import CustomerRepository from "../../customer/repository/customer.repository";
import ProductRepository from "../../product/repository/product.repository";
import Customer from "../../../domain/customer/entity/customer";
import Product from "../../../domain/product/entity/product";
describe("Order Repository tests", () => {

    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        await sequilize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it('should create a new order', async () => {
        const { order, orderItem } = await buildOrder();

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        await assertOrderInDatabase(order, orderItem);
    });

    it('should update an existing order', async () => {
        const { order, orderItem } = await buildOrder();
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const changedOrder = await buildAlternativeOrder(order.id, orderItem.id);
        await orderRepository.update(changedOrder.order);

        await assertOrderInDatabase(changedOrder.order, changedOrder.orderItem);
    });

    it('should find an existing order', async () => {
        const { order } = await buildOrder();
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(order.id);

        expect(foundOrder).toStrictEqual(order);
    });

    it('should find all order', async () => {
        const { order } = await buildOrder();
        const alt = await buildAlternativeOrder(null, null);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        await orderRepository.create(alt.order);

        const orders = await orderRepository.findAll();

        expect(orders).toStrictEqual([order, alt.order]);
    });

});

async function assertOrderInDatabase(order: Order, orderItem: OrderItem) {
    try {
        const orderModel = await OrderModel.findOne(
            {
                where: { id: order.id },
                include: [{ model: OrderItemModel }]
            });

            expect(orderModel.toJSON()).toStrictEqual({
                id: order.id,
                customer_id: order.customerId,
                total: order.total(),
                items: [
                    {
                        id: orderItem.id,
                        price: orderItem.price,
                        name: orderItem.name,
                        quantity: orderItem.quantity,
                        order_id: order.id,
                        product_id: orderItem.productId,
                    }
                ]
            });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function buildOrder() {
    const customerRepository = new CustomerRepository();
    const addr = new Address("street", 12, "zip", "city");
    const customer = new Customer("Tomas", addr);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("name", 12);
    await productRepository.create(product);

    const orderItem = new OrderItem("item", 20, product.id, 10);
    const order = new Order(customer.id, [orderItem]);
    return { order, orderItem };
}

async function buildAlternativeOrder(id: string, itemId: string) {
    const customerRepository = new CustomerRepository();
    const addr = new Address("street", 12, "zip", "city");
    const customer = new Customer("Silvia", addr);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("changed", 3);
    await productRepository.create(product);

    const orderItem = new OrderItem("changed", 1, product.id, 2, itemId);
    const order = new Order(customer.id, [orderItem], id);
    return { order, orderItem };
}
