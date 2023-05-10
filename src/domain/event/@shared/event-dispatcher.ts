import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }

    notify(event: EventInterface): void {
        const eventHandler = this.eventHandlers[event.constructor.name];

        if (eventHandler) {
            eventHandler.forEach(handler => {
                handler.handle(event);
            })
        }
    }

    register(event: string, handler: EventHandlerInterface<EventInterface>): void {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }

        this.eventHandlers[event].push(handler);
    }

    unregister(event: string, handler: EventHandlerInterface<EventInterface>): void {
        if (this.eventHandlers[event]) {
            const index = this.eventHandlers[event].indexOf(handler);
            this.eventHandlers[event].splice(index, 1);
        }
    }

    unregisterAll(): void {
       this.eventHandlers = {};
    }
    
}