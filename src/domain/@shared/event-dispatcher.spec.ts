import AddressChangedEvent from "../customer/event/address-changed-event";
import CustomerCreatedEvent from "../customer/event/customer-created-event";
import EnviaConsoleLogHandler from "../customer/event/handler/send-console-log-when-address-is-changed.handler";
import EnviaConsoleLog1Handler from "../customer/event/handler/send-console-log1-when-customer-is-created.handler";
import EnviaConsoleLog2Handler from "../customer/event/handler/send-console-log2-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/event/product-created-event";
import EventDispatcher from "./event/event-dispatcher";
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
   
    it("should send console log 1 and 2 when customer is created", () => {
       const eventDispatcher = new EventDispatcher();
       const eventHandlerLog1 = new EnviaConsoleLog1Handler();
       const spyEventHandlerLog1 = jest.spyOn(eventHandlerLog1, "handle");
       const eventHandlerLog2 = new EnviaConsoleLog2Handler();
       const spyEventHandlerLog2 = jest.spyOn(eventHandlerLog2, "handle");

       eventDispatcher.register("CustomerCreatedEvent", eventHandlerLog1);
       expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerLog1);

       eventDispatcher.register("CustomerCreatedEvent", eventHandlerLog2);
       expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerLog2);

       const event = new CustomerCreatedEvent({
        name: "Customer"
       });

       eventDispatcher.notify(event);

       expect(spyEventHandlerLog1).toHaveBeenCalled();
       expect(spyEventHandlerLog2).toHaveBeenCalled();
    });
   
    it("should send console log when customer address is changed", () => {
       const eventDispatcher = new EventDispatcher();
       const eventHandlerLog = new EnviaConsoleLogHandler();
       const spyEventHandlerLog = jest.spyOn(eventHandlerLog, "handle");

       eventDispatcher.register("AddressChangedEvent", eventHandlerLog);
       expect(eventDispatcher.getEventHandlers["AddressChangedEvent"][0]).toMatchObject(eventHandlerLog);

       const event = new AddressChangedEvent({
        id: 1238,
        nome: "João",
        endereco: "new address"
       });

       eventDispatcher.notify(event);

       expect(spyEventHandlerLog).toHaveBeenCalled();
    });
});