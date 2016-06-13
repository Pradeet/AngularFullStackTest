'use strict';

import mongoose from 'mongoose';
import User from '../user/user.model';
import config from '../../config/environment';

const options = {
  discriminatorKey: 'role'
};
var CommitteeSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    default: null,
    validate: {
      validator: function(value) {
        return /\d{10}/.test(value);
      },
      message: '{VALUE} is not a valid Mobile Number!'
    }
  },
  alternateEmail: {
    type: String,
    default: null,
    validate: {
      validator: function(value) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
      }
    }
  },
  isActive: {
    type: Boolean,
    default: false
  },
  fromDrive: {
    type: Number,
    default: config.currentDrive
  },
  toDrive: {
    type: Number,
    validate: {
      validator: function(value) {
        return value > this.fromDrive;
      },
      message: '{VALUE} should be greator than fromDrive!'
    }
  }
}, options);

export default User.discriminator('Committee', CommitteeSchema);
