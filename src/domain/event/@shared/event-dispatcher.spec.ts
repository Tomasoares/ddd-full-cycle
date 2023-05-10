import AddressChangedEvent from "./customer/address-changed-event";
import CustomerCreatedEvent from "./customer/customer-created-event";
import EnviaConsoleLog1Handler from "./customer/handler/send-console-log1-when-customer-is-created.handler";
import EnviaConsoleLog2Handler from "./customer/handler/send-console-log2-when-address-is-changed.handler";
import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./product/product-created-event";

describe("Domain events tests", () => {
   
    it("should register an event handler", () => {
       const eventDispatcher = new EventDispatcher();
       const eventHandler = new SendEmailWhenProductIsCreatedHandler();

       eventDispatcher.register("ProductCreatedEvent", eventHandler);

       expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
       expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
       expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });
   
    it("should unregister an event handler", () => {
       const eventDispatcher = new EventDispatcher();
       const eventHandler = new SendEmailWhenProductIsCreatedHandler();

       eventDispatcher.register("ProductCreatedEvent", eventHandler);
       expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

       eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
       expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });
   
    it("should unregister all events", () => {
       const eventDispatcher = new EventDispatcher();
       const eventHandler = new SendEmailWhenProductIsCreatedHandler();

       eventDispatcher.register("ProductCreatedEvent", eventHandler);
       expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

       eventDispatcher.unregisterAll();
       expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });
   
    it("should notifu all event handlers", () => {
       const eventDispatcher = new EventDispatcher();
       const eventHandler = new SendEmailWhenProductIsCreatedHandler();
       const spyEventHandler = jest.spyOn(eventHandler, "handle");

       eventDispatcher.register("ProductCreatedEvent", eventHandler);
       expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

       const productCreatedEvent = new ProductCreatedEvent({
        name: "Product 1",
        description: "product 1 description",
        price: 100.0,
        createdAt: new Date()
       });

       eventDispatcher.notify(productCreatedEvent);

       expect(spyEventHandler).toHaveBeenCalled();
    });
   
    it("should send console log 1 when customer is created", () => {
       const eventDispatcher = new EventDispatcher();
       const eventHandler = new EnviaConsoleLog1Handler();
       const spyEventHandler = jest.spyOn(eventHandler, "handle");

       eventDispatcher.register("CustomerCreatedEvent", eventHandler);
       expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

       const event = new CustomerCreatedEvent({
        name: "Customer"
       });

       eventDispatcher.notify(event);

       expect(spyEventHandler).toHaveBeenCalled();
    });
   
    it("should send console log 21 when customer address is changed", () => {
       const eventDispatcher = new EventDispatcher();
       const eventHandler = new EnviaConsoleLog2Handler();
       const spyEventHandler = jest.spyOn(eventHandler, "handle");

       eventDispatcher.register("AddressChangedEvent", eventHandler);
       expect(eventDispatcher.getEventHandlers["AddressChangedEvent"][0]).toMatchObject(eventHandler);

       const event = new AddressChangedEvent({
        address: "Address changed"
       });

       eventDispatcher.notify(event);

       expect(spyEventHandler).toHaveBeenCalled();
    });
});