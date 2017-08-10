'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Context } from './context.js';
import { Accounts } from './accounts.js';

import { Account } from '../core/models/account.js';
import { Position } from '../core/models/position.js';
import { Rate } from '../core/models/rate.js';

/** API Context. */
const ctx = new Context('positions');

/** Positions collection. */
export const Positions = ctx.collection;

Meteor.methods({
    'positions.insert': ({
        accountId, price, quantity, exchange, takeProfit}) => {
        check(accountId, String);
        check(price, Number);
        check(quantity, Number);
        check(exchange, Number);
        check(takeProfit, Number);
        Context.checkSignIn();
        const account = Account.load(Accounts.findOne(accountId));
        const rate =
            new Rate({
                "pair": account.pair, "ask": price, "bid": price});
        const position =
            new Position({
                "accountId": account.id,
                "rate": rate,
                "quantity": quantity,
                "exchange": exchange,
                "takeProfit": takeProfit
            });
        ctx.insertCollection(position);
    },
    'positions.remove': positionId => {
        check(positionId, String);
        Context.checkSignIn();
        Positions.remove(positionId);
    },
    'positions.removeByAccount': accountId => {
        check(accountId, String);
        Context.checkSignIn();
        Positions.remove({ "accountId": accountId });
    },
    'positions.removeByUser': () => {
        Context.checkSignIn();
        Positions.remove(Context.uidData());
    },
});