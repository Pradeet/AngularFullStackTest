/**
 * CompanyEvent model events
 */

'use strict';

import {EventEmitter} from 'events';
import CompanyEvent from './companyEvent.model';
var CompanyEventEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CompanyEventEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CompanyEvent.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CompanyEventEvents.emit(event + ':' + doc._id, doc);
    CompanyEventEvents.emit(event, doc);
  }
}

export default CompanyEventEvents;
