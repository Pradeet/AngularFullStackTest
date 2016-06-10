'use strict';

import mongoose from 'mongoose';

var CompanyOfficialSchema = new mongoose.Schema({
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
    // TODO: add designation enum [HR, Team].
  }
});

export default mongoose.model('CompanyOfficial', CompanyOfficialSchema);
