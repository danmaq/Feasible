'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Positions } from '../../api/positions.js';

import { ExchangeKV } from '../../core/enums/exchange.js';
import { Position } from '../../core/models/position.js';

import './positions.html';
import './position.js';

/** Default position instance. */
const DEFAULT_POSITION = new Position();

/** Get account-id from router. */
const getAccountId = () => FlowRouter.getParam('accountId');

/** Get positions list from account-id. */
const getPositions = () => Positions.find({ "accountId": getAccountId() });

Template.positions.onCreated(() => {
    Meteor.subscribe('accounts');
    Meteor.subscribe('positions');
});
Template.positions.helpers({
    "positions": getPositions,
    "positionLength": () => getPositions().count(),
    "price": DEFAULT_POSITION.rate,
    "quantity": DEFAULT_POSITION.quantity,
    "exchanges": ExchangeKV,
});
Template.positions.events({
    "submit #fe-add-position": event => {
        event.preventDefault();
        const target = event.target;
        const price = Number.parseFloat(target['price'].value);
        Meteor.call(
            'positions.insert',
            getAccountId(),
            price,
            price,
            Number.parseInt(target['quantity'].value),
            Number.parseInt(target['exchange'].value),
            Number.parseFloat(target['takeProfit'].value));
    },
});