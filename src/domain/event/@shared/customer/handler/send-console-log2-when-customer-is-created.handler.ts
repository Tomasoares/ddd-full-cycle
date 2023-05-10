import EventHandlerInterface from "../../event-handler.interface";
import AddressChangedEvent from "../address-changed-event";

export default class EnviaConsoleLog2Handler implements EventHandlerInterface<AddressChangedEvent> {
    
    handle(event: AddressChangedEvent): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }

}