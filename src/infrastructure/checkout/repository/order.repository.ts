import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "../product/repository/sequelize/model/order-item.model";
import OrderModel from "../product/repository/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            })),
        },
        {
            include: [{model: OrderItemModel}]
        });
    }

    async update(entity: Order): Promise<void> {
        await OrderItemModel.destroy(
            {
                where: {
                    order_id: entity.id
                }
            }
        );

        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            })),
        },
            {
                where: {
                    id: entity.id
                }
            }
        );

        await OrderItemModel.bulkCreate(entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            order_id: entity.id,
            quantity: item.quantity
        })));
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne(
            {
                where: { id },
                include: [{ model: OrderItemModel }]
            });

        return new Order(orderModel.customer_id, orderModel.items.map(item => new OrderItem(
            item.name, 
            item.price, 
            item.product_id, 
            item.quantity, 
            item.id)), 
            id);
    }

    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll(
            {
                include: [{ model: OrderItemModel }]
            });

        return orders.map(order => new Order(order.customer_id,
            order.items.map(item => new OrderItem(item.name,
                item.price,
                item.product_id,
                item.quantity,
                item.id)),
            order.id));
    }
}