'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Positions } from '../api/positions.js';
// import { Position } from '../core/models/position.js';

import './body.html';

// console.log(new Position() === new Position());
// console.log(new Position() == new Position());
// console.log(Object.is(new Position(), new Position()));

Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('positions');
});

Template.body.helpers({
    positions() { return Positions.Find({}); }
});

Template.body.events({

});