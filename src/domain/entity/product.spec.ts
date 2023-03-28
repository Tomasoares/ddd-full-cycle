import Product from "./product";

describe("Product unit tests", () => {

    it("should generate id", () => {
        let product = new Product("Product 1", 100);
        expect(product.id).toBeDefined();
    });

    it("name cannot be empty", () => {
        expect(() => { new Product("", 100);;
        }).toThrowError("Name cannot be empty");
    });

    it("price cannot be negative", () => {
        expect(() => { new Product("Product 2", -1);
        }).toThrowError("Price cannot be negative");
    });

    it("should change name", () => {
        let product = new Product("Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        let product = new Product("Product 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });


});