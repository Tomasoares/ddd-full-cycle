import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {

    it("should readjust the prices of all products", () => {
        const p1 = new Product("Product 1", 10);    
        const p2 = new Product("Product 1", 20);

        ProductService.readjustPrice([p1, p2], 100);

        expect(p1.price).toBe(20);
        expect(p2.price).toBe(40);
    });
});