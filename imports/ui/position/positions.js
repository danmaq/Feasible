'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Accounts } from '../../api/accounts.js';
import { Positions } from '../../api/positions.js';

import { ExchangeKV } from '../../core/enums/exchange.js';
import { Account, AccountUtil } from '../../core/models/account.js';
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
        const quantity = Number.parseInt(target['quantity'].value);
        const exchange = Number.parseInt(target['exchange'].value);
        const tp = Number.parseFloat(target['takeProfit'].value);
        const accountId = getAccountId();
        const accountRaw = Accounts.findOne(accountId);
        if (!accountRaw) {
            throw new Meteor.Error('unknown-account');
        }
        Meteor.call(
            'positions.insert',
            accountId,
            AccountUtil.load(accountRaw.body).pair,
            price,
            price,
            quantity,
            exchange,
            tp);
    },
});