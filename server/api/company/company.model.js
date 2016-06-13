'use strict';

import mongoose from 'mongoose';

var CompanySchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  website: String,
  companyProfile: String,
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    validate: {
      validator: function(value) {
        return /\d{6}/.test(value);
      },
      message: '{VALUE} is not a valid Postal Code!'
    },
    required: true
  },
  contactNumber: {
    type: String,
    validate: {
      validator: function(value) {
        return /\d{10}/.test(value);
      },
      message: '{VALUE} is not a valid Mobile Number!'
    }
  },

});

export default mongoose.model('Company', CompanySchema);
