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
    'accounts.insert' (account) {
        check(account, Account);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Accounts.insert({
            account,
            sortBy: account.pair,
            owner: Meteor.userId()
        });
    },
    'accounts.remove' (accountId) {
        check(accountId, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Accounts.remove(accountId);
    },
});