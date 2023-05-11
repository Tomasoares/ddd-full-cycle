import Product from "../entity/product";

export default class ProductService {

    static readjustPrice(products: Product[], percentage: number): void {
        products.forEach(p => p.readjustPrice(percentage));
    }

}