import { Sequelize} from "sequelize-typescript";
import Product from "../../domain/entity/product";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import {v4 as uuidV4} from 'uuid';

describe("Product Repository tests", () => {

    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        await sequilize.addModels([ProductModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("should create a new product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: product.id}});

        expect(productModel.toJSON()).toStrictEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });

    it("should update a product", async () => {
        const repository = new ProductRepository();

        const p = new Product("tomas", 10);

        ProductModel.create({
            id: p.id,
            name: p.name,
            price: p.price
        });

        p.changeName("pedro");
        p.changePrice(20);

        repository.update(p);

        const productModel = await ProductModel.findOne({ where: { id: p.id}});

        expect(productModel.toJSON()).toStrictEqual({
            id: p.id,
            name: p.name,
            price: p.price
        });
    });

    it("should find a product", async () => {
        const repository = new ProductRepository();

        const p = new Product("tomas", 10);
        ProductModel.create({
            id: p.id,
            name: p.name,
            price: p.price
        });

        const foundProduct = await repository.find(p.id);

        expect(foundProduct).toMatchObject(p);
    });

    it("should find all products", async () => {
        const repository = new ProductRepository();

        const p = new Product("tomas", 10);
        ProductModel.create({
            id: p.id,
            name: p.name,
            price: p.price
        });
        
        const p2 = new Product("tomas2", 20);
        ProductModel.create({
            id: p2.id,
            name: p2.name,
            price: p2.price
        });

        const foundProducs = await repository.findAll();

        expect([p, p2]).toEqual(foundProducs);

    });

});