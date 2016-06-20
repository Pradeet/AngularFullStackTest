'use strict';

import mongoose from 'mongoose';

var CompanySchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,

  website: String,
  companyProfile: String,
  addressLine1: {
    type: String,
    required: false
  },
  addressLine2: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  postalCode: {
    type: String,
    required: false
  },
  contactNumber: String,
});

export default mongoose.model('Company', CompanySchema);
