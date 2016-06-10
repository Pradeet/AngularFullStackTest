'use strict';

import mongoose from 'mongoose';
import config from '../../config/environment';

const options = {
  discriminatorKey: 'EventType'
};
var EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  placementDrive: {
    type: Number,
    default: config.currentDrive;
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, options);

export default mongoose.model('Event', EventSchema);
