import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            active: entity.active,
            rewardPoints: entity.rewardPoints,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city
        });

    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                active: entity.active,
                rewardPoints: entity.rewardPoints,
                street: entity.address.street,
                number: entity.address.number,
                zipcode: entity.address.zip,
                city: entity.address.city
            },
            {
                where: {
                    id: entity.id
                }
            }
        )
    }

    async find(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findOne({ where: { id } });
        const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
        return new Customer(customerModel.name, address, customerModel.id);
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        
        return customerModels.map((customerModel) => {
            
        const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
            return new Customer(customerModel.name, address, customerModel.id)
        });
    }

}