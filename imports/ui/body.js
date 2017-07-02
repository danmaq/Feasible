'use strict';

import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';

import { Accounts } from '../api/accounts.js';

import './body.html';
import './account.js';
import './form/addAccount.js';

Template.body.onCreated(
    () => {
        const state = new ReactiveDict();
        Template.instance().state = state;
        Meteor.subscribe('accounts');
    });
Template.body.helpers({
    "accounts": () => Accounts.find({}, { "sort": { "sortBy": 1 } }),
    "accountLength": () => Accounts.find().count(),
});
Template.body.events({});

/*
import { Positions } from '../api/positions.js';
import { Orders } from '../api/orders.js';
import { Rate } from '../core/models/rate.js';


const SHOW_ADD_POSITION = 'showAddPosition';

Template.body.onCreated(
    () => {
        const state = new ReactiveDict();
        state.set('showAddPosition', false);
        Template.instance().state = state;
        Meteor.subscribe('positions');
    });

Template.body.helpers({
    positions() { return Positions.find({}); },
    positionsLength() { return Positions.find({}).count(); },
    showAddPosition() {
        return Template.instance().state.get('showAddPosition');
    },
    orders() { return Orders.find({}); },
    ordersLength() { return Orders.find({}).count(); },
});

Template.body.events({
    'submit .add-position' (event) {
        // stop propagation
        event.preventDefault();
        // get value.
        const target = event.target;
        const dt = new Date(target['fap-datetime'].value);
        console.log(dt);
        const price = Number.parseFloat(target['fap-rate'].value);
        const exchange = Number.parseInt(target['fap-exchange'].value);
        new Rate(0, dt, price, price)
        console.log(new Rate(0, dt, price, price));
    },
    'change .show-add-position input' (event, instance) {
        Template.instance().state.set('showAddPosition', event.target.checked);
    },
});
*/