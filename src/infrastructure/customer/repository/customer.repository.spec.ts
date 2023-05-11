import { Sequelize} from "sequelize-typescript";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import CustomerModel from "./sequelize/model/customer.model";
import Address from "../../../domain/customer/entity/address";

describe("Customer Repository tests", () => {

    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        await sequilize.addModels([CustomerModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("should create a new customer", async () => {
        const repository = new CustomerRepository();
        const add = new Address("1", 2, "3", "4");
        const c = new Customer("Tomas", add);

        await repository.create(c);

        const model = await CustomerModel.findOne({ where: { id: c.id}});

        expect(model.toJSON()).toStrictEqual({
            id: c.id,
            name: c.name,
            active: c.active,
            rewardPoints: c.rewardPoints,
            street: add.street,
            number: add.number,
            zipcode: add.zip,
            city: add.city
        });
    });

    it("should update a customer", async () => {
        const repository = new CustomerRepository();
        const add = new Address("1", 2, "3", "4");
        const c = new Customer("Tomas", add);

        CustomerModel.create({
            id: c.id,
            name: c.name,
            active: c.active,
            rewardPoints: c.rewardPoints,
            street: add.street,
            number: add.number,
            zipcode: add.zip,
            city: add.city
        });

        c.changeName("Pedro");
        c.addRewardPoints(10);
        c.activate();

        repository.update(c);

        const model = await CustomerModel.findOne({ where: { id: c.id}});

        expect(model.toJSON()).toStrictEqual({
            id: c.id,
            name: c.name,
            active: c.active,
            rewardPoints: c.rewardPoints,
            street: add.street,
            number: add.number,
            zipcode: add.zip,
            city: add.city
        });
    });

    it("should find a product", async () => {
        const repository = new CustomerRepository();

        const add = new Address("1", 2, "3", "4");
        const c = new Customer("Tomas", add);
        CustomerModel.create({
            id: c.id,
            name: c.name,
            active: c.active,
            rewardPoints: c.rewardPoints,
            street: add.street,
            number: add.number,
            zipcode: add.zip,
            city: add.city
        });

        const found = await repository.find(c.id);

        expect(found).toMatchObject(c);
    });

    it("should find all products", async () => {
        const repository = new CustomerRepository();

        const add = new Address("1", 2, "3", "4");
        const c = new Customer("Tomas", add);
        CustomerModel.create({
            id: c.id,
            name: c.name,
            active: c.active,
            rewardPoints: c.rewardPoints,
            street: add.street,
            number: add.number,
            zipcode: add.zip,
            city: add.city
        });
        
        const c2 = new Customer("Tomas2", add);
        CustomerModel.create({
            id: c2.id,
            name: c2.name,
            active: c2.active,
            rewardPoints: c2.rewardPoints,
            street: add.street,
            number: add.number,
            zipcode: add.zip,
            city: add.city
        });

        const foundAll = await repository.findAll();

        expect([c, c2]).toEqual(foundAll);

    });

});