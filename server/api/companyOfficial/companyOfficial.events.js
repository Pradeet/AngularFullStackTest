/**
 * CompanyOfficial model events
 */

'use strict';

import {EventEmitter} from 'events';
import CompanyOfficial from './companyOfficial.model';
var CompanyOfficialEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CompanyOfficialEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CompanyOfficial.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CompanyOfficialEvents.emit(event + ':' + doc._id, doc);
    CompanyOfficialEvents.emit(event, doc);
  }
}

export default CompanyOfficialEvents;
