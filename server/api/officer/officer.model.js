'use strict';

import mongoose from 'mongoose';
import User from '../user/user.model';

const options = {
  discriminatorKey: 'role'
};

var OfficerSchema = new mongoose.Schema({
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
  designation: {
    type: String
    // TODO: add designation enum here.
  }
}, options);

export default User.discriminator('Officer', OfficerSchema);
