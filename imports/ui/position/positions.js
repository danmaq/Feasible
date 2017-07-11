'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Positions } from '../../api/positions.js';

import './positions.html';
import './position.js';
import './addPosition.js';

Template.positions.onCreated(() => Meteor.subscribe('positions'));
Template.positions.helpers({
    "positions": () => Positions.find({}, {}),
    "positionLength": () => Positions.find().count(),
});
Template.positions.events({});