/*
 * An Event Emitter lets you create a pub/sub (publisher/subscriber) pattern.
 * It allows parts of your code to subscribe to "events" and be notified when those events happen.
 *
 * Implementation steps:
 * 1. Create an events object to store event listeners
 *    - Each event name will map to an array of listener functions
 *    - should look like this:
 *    {
 *      event_1: [...hadnlers],
 *      event_2: [...hadnlers],
 *    }
 *
 * 2. Implement 'subscribe' method that:
 *    - Takes event name and listener function
 *    - Adds listener to the events object
 *    - Returns function to remove (unsubscribe) the listener
 *
 * 3. Implement 'emit' method that:
 *    - Takes event name and data
 *    - Finds all listeners for that event
 *    - Calls each listener with the data
 */
function createEventEmitter() {
  // const listeners = {
  //   "order.created": [() => {}, () => {}],
  //   "order.refunded": [() => {}],
  // };

  const listeners = {};
  window.myListeners = listeners;

  return {
    subscribe(eventName, handlerFunction) {
      if (!listeners[eventName]) {
        listeners[eventName] = [];
      }
      listeners[eventName].push(handlerFunction);

      return function () {
        listeners[eventName] = listeners[eventName].filter((h) => {
          return h !== handlerFunction;
        });
      };
    },

    emit(eventName, payload) {
      const handlers = listeners[eventName];

      if (!handlers) {
        return;
      }

      handlers.forEach((handler) => {
        handler(payload);
      });
    },
  };
}

const eventEmitter = createEventEmitter();

eventEmitter.subscribe("order.created", (value) => {
  console.log(`Order created handler #1: ${value}`);
});

eventEmitter.subscribe("order.created", (value) => {
  console.log(`Order created handler #2: ${value}`);
});

const unsubscribeFromEvent3 = eventEmitter.subscribe(
  "order.created",
  (value) => {
    console.log(`Order created handler #3: ${value}`);
  }
);

eventEmitter.subscribe("order.refunded", (value) => {
  console.log(`Order refunded handler #1: ${value}`);
});

eventEmitter.emit("order.created", 17);
eventEmitter.emit("order.refunded", -332);

// remove handler number #3
console.log("before unsubscribe", window.myListeners);
unsubscribeFromEvent3();
console.log("after unsubscribe", window.myListeners);
console.log(window.myListeners);

eventEmitter.emit("order.created", 500);
