import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
    notify(event: EventInterface): void;
    register(event: string, handler: EventHandlerInterface): void;
    unregister(event: string, handler: EventHandlerInterface): void;
    unregisterAll(): void;
}