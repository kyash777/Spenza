
import Connection from "./connection/db.js";
import Event from "./model/event.js";
import fs from "fs"

class Events {

    constructor() {
      this.eventHandlers = {};
    }
  
    // Register an event handler

    on(eventName, callback) {
      if (!this.eventHandlers[eventName]) {
        this.eventHandlers[eventName] = [];
      }
      this.eventHandlers[eventName].push(callback);
    }
  
    // Trigger all callbacks associated with a given eventName

    trigger(eventName) {
      const callbacks = this.eventHandlers[eventName];
      if (callbacks) {
        callbacks.forEach((callback) => {
          callback();
        });
  
        // Log the triggered event in MongoDB
        const newEvent = new Event({ event: eventName });
        newEvent.save();
        printLogging(eventName, newEvent.triggerTime)
      }
    }
  
    // Remove all event handlers associated with the given eventName
    off(eventName) {

        const offEvent = new Event({ event: `off_${eventName}` });
        offEvent.save();

        printLogging(`off_${eventName}`, offEvent.triggerTime);

       this.eventHandlers[eventName] = [];
    }
  }
  
  // Print all logging in app.log file
    const printLogging=(event, timestamp)=>{
    const logMessage = `${event} --> ${timestamp}\n`;
    fs.appendFile('app.log', logMessage, (err) => {
      if (err) throw err;
      console.log('Logging saved to app.log');
    });
  }
  
  const events = new Events();
  
  // Example usage
  events.on('click', () => {
    console.log('Hello');
  });

  events.on('click', () => {
    console.log('World');
  });
  
  events.off('click', () => {
    console.log('Hello!');
  });

  events.off('click', () => {
    console.log('There!');
  });
  
  events.trigger('click');
  
  events.off('click');

  Connection();