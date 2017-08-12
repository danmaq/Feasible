'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ExchangeKV } from '../../core/enums/exchange.js';

import Position from '../../core/models/position.js';

import AccountUtil from '../account/accountUtil.js';
import formUtil from '../formUtil.js';

import './positions.html';
import './position.js';

/** Default position instance. */
const DEFAULT_POSITION = new Position();

/** Convert function: String to Number. */
const TO_FLOAT = formUtil.to.float;

/** Convert function: String to integer (number). */
const TO_INT = formUtil.to.int;

/** Get positions. */
const positions = () => AccountUtil.tryGet([], a => a.positions);

Template.positions.onCreated(AccountUtil.subscribe);
Template.positions.helpers({
    "positions": positions,
    "positionLength": () => positions().length,
    "price": DEFAULT_POSITION.price,
    "quantity": DEFAULT_POSITION.quantity,
    "exchanges": ExchangeKV,
});
Template.positions.events({
    "submit #fe-add-position": event => {
        event.preventDefault();
        const params =
            formUtil.parse(
                event.target, {
                    "price": TO_FLOAT,
                    "quantity": TO_INT,
                    "exchange": TO_INT,
                    "takeProfit": TO_FLOAT,
                });
        const target = event.target;
        const price = Number.parseFloat(target['price'].value);
        Meteor.call(
            'positions.insert', { "accountId": accountId(), ...params });
    },
});