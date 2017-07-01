'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Account } from '../core/models/account.js';

export const Accounts = new Mongo.Collection('accounts');

if (Meteor.isServer) {
    Meteor.publish(
        'accounts',
        function accountsPublication() {
            return Accounts.find({ owner: this.userId });
        });
}

Meteor.methods({
    "accounts.insert": (pair, lot, mul, step, martin) => {
        check(pair, Number);
        check(lot, Number);
        check(mul, Number);
        check(step, Number);
        check(martin, Number);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        const account = new Account(pair, lot, mul, step, martin);
        Accounts.insert({
            account,
            sortBy: account.pair,
            owner: Meteor.userId()
        });
    },
    "accounts.remove": (accountId) => {
        check(accountId, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Accounts.remove(accountId);
    },
});