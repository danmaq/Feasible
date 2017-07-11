'use strict'

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { Positions } from '../../api/positions.js';

import { ExchangeKV } from '../../core/enums/exchange.js';
import { Position } from '../../core/models/position.js';

import './addPosition.html';

const DEFAULT_POSITION = new Position();

Template.addPosition.onCreated(() => {});
Template.addPosition.helpers({
    "price": () => DEFAULT_POSITION.rate,
    "quantity": () => DEFAULT_POSITION.quantity,
    "exchanges": () => ExchangeKV,
});
Template.addPosition.events({
    "submit .fe-add-position": event => {
        event.preventDefault();
        const target = event.target;
        const accountId = target['accountId'].value;
        const price = Number.parseFloat(target['price'].value);
        const quantity = Number.parseInt(target['quantity'].value);
        const exchange = Number.parseInt(target['exchange'].value);
        const tp = Number.parseFloat(target['takeProfit'].value);
        Meteor.call(
            'positions.insert',
            accountId,
            price,
            price,
            quantity,
            exchange,
            tp);
    },
});