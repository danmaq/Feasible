'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Positions } from '../../api/positions.js';

import { ExchangeKV } from '../../core/enums/exchange.js';
import { Position } from '../../core/models/position.js';

import './positions.html';
import './position.js';

const getAccountId = () => FlowRouter.getParam('accountId');
const getPositions = () => Positions.find({ "accountId": getAccountId() });
const DEFAULT_POSITION = new Position();

Template.positions.onCreated(() => { Meteor.subscribe('positions') });
Template.positions.helpers({
    "positions": () => getPositions(),
    "positionLength": () => getPositions().count(),
    "price": () => DEFAULT_POSITION.rate,
    "quantity": () => DEFAULT_POSITION.quantity,
    "exchanges": () => ExchangeKV,
});
Template.positions.events({
    "submit .fe-add-position": event => {
        event.preventDefault();
        const target = event.target;
        const price = Number.parseFloat(target['price'].value);
        const quantity = Number.parseInt(target['quantity'].value);
        const exchange = Number.parseInt(target['exchange'].value);
        const tp = Number.parseFloat(target['takeProfit'].value);
        Meteor.call(
            'positions.insert',
            getAccountId(),
            price,
            price,
            quantity,
            exchange,
            tp);
    },
});