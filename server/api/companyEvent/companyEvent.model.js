'use strict';

import mongoose from 'mongoose';
import Event from '../event/event.model';
import config from '../../config/environment';

const options = {
  discriminatorKey: 'EventType'
};

var CompanyEventSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true
  },
  hr: {
    type: mongoose.Schema.ObjectId,
    ref: 'CompanyOfficial',
    required: true
  },
  RecruitmentDatePrefered: {
    type: Date
  },
  sizeOfTeam: {
    type: Number,
    default: 0
  },
  jobProfile: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  jobDesignation: {
    type: String,
    required: true
  },
  postiongLocations: {
    type: [String],
    required: true
  },
  AccomodationProvided: {
    type: Boolean,
    default: false
  },
  jobBond: {
    type: Number,
    default: 0
  },
  BTech: {
    type: Boolean,
    default: true
  },
  MTech: {
    type: Boolean,
    default: true
  },
  MscIT: {
    type: Boolean,
    default: true
  },
  MscIctARD: {
    type: Boolean,
    default: true
  },
  MDes: {
    type: Boolean,
    default: true
  },
  // TODO: fix intenship attribute.
  intenship: {
    type: {},
    default: {}
  },
  resumeShortList: {
    type: Boolean,
    default: false
  },
  CPICriteria: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  processDetails: {
    type: [String],
    required: true
  },
  roomsNeeded: {
    type: Number,
    min: 0,
    max: 10
  }
}, options);

export default Event.discriminator('CompanyEvent', CompanyEventSchema);
