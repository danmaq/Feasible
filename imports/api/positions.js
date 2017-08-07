'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Accounts } from './accounts.js';

import { Account } from '../core/models/account.js';
import { Position } from '../core/models/position.js';
import { Rate } from '../core/models/rate.js';

/** Positions collection. */
export const Positions = new Mongo.Collection('positions');

/** get user-ID data. */
const getUIDData = () => ({ "owner": Meteor.userId() });

if (Meteor.isServer) {
    Meteor.publish('positions', () => Positions.find(getUIDData()));
}

/** Create record for collection. */
const createRecord =
    (position = new Position()) =>
    ({...position.exportWithoutId(), ...getUIDData() });

/** Check sign-in. */
const checkSignIn =
    () => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
    };

Meteor.methods({
    'positions.insert': (accountId, price, quantity, exchange, takeProfit) => {
        check(accountId, String);
        check(price, Number);
        check(quantity, Number);
        check(exchange, Number);
        check(takeProfit, Number);
        checkSignIn();
        const account = Account.load(Accounts.findOne(accountId));
        const rate = new Rate(account.pair, price, price);
        const pos =
            new Position(
                account.id, rate, quantity, exchange, takeProfit);
        Positions.insert(createRecord(pos));
    },
    'positions.remove': positionId => {
        check(positionId, String);
        checkSignIn();
        Positions.remove(positionId);
    },
    'positions.removeByAccount': accountId => {
        check(accountId, String);
        checkSignIn();
        Positions.remove({ "accountId": accountId });
    },
    'positions.removeByUser': () => {
        checkSignIn();
        Positions.remove(getUIDData());
    },
});