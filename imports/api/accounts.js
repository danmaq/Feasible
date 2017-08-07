'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Account, AccountUtil } from '../core/models/account.js';
import { Rate } from '../core/models/rate.js';
import { Swap } from '../core/models/swap.js';

/** Accounts collection. */
export const Accounts = new Mongo.Collection('accounts');

if (Meteor.isServer) {
    Meteor.publish('accounts', () => Accounts.find(getUIDData()));
}

/** get user-ID data. */
const getUIDData = () => ({ "owner": Meteor.userId() });

/** Create record for collection. */
const createRecord =
    (account = new Account()) =>
        ({ ...account.exportWithoutId(), ...getUIDData() });

Meteor.methods({
    "accounts.insert": (pair, swapLong, swapShort, lot, mul, step, martin) => {
        check(pair, Number);
        check(swapLong, Number);
        check(swapShort, Number);
        check(lot, Number);
        check(mul, Number);
        check(step, Number);
        check(martin, Number);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        const swap = new Swap(swapLong, swapShort);
        const account =
            new Account(pair, new Rate(), swap, lot, mul, step, martin);
        Accounts.insert(createRecord(account));
    },
    "accounts.remove": accountId => {
        check(accountId, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Accounts.remove(accountId);
    },
    "accounts.removeUser": () => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Accounts.remove(getUIDData());
    },
    "accounts.updateRate": (accountId, ask, bid) => {
        check(accountId, String);
        check(ask, Number);
        check(bid, Number);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        const accountRaw = Accounts.findOne(accountId);
        if (!accountRaw) {
            throw new Meteor.Error('unknown-account');
        }
        const account = AccountUtil.load(accountRaw.body);
        const rate = account.rate.clone({ "ask": ask, "bid": bid });
        const cloned = account.clone({ "rate": rate });
        Accounts.update(accountId, createRecord(cloned));
    },
});