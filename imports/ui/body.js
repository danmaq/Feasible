'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Positions } from '../api/positions.js';
import { Orders } from '../api/orders.js';

import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('positions');
});

Template.body.helpers({
    positions() { return Positions.find({}); },
    positionsLength() { return Positions.find({}).count(); },
    orders() { return Orders.find({}); },
    ordersLength() { return Orders.find({}).count(); },
});

Template.body.events({

});