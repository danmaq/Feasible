'use strict';

import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';

import { Positions } from '../api/positions.js';
import { Orders } from '../api/orders.js';

import './body.html';

Template.body.onCreated(
    function bodyOnCreated() {
        this.state = new ReactiveDict();
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