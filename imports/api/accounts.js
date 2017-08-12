'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Context } from './context.js';

import Account from '../core/models/account.js';
import Preference from '../core/models/preference.js';
import Rate from '../core/models/rate.js';
import Swap from '../core/models/swap.js';

/** API Context. */
const ctx = new Context('accounts');

/** Accounts collection. */
export default ctx.collection;

const getAccount =
    accountId => {
        Context.checkSignIn();
        const accountRaw = ctx.collection.findOne(accountId);
        if (!accountRaw) {
            throw new Meteor.Error('unknown-account');
        }
        return Account.load(accountRaw);
    };

Meteor.methods({
    "accounts.create": ({ preference, swap }) => {
        check(preference, Preference.structure);
        check(swap, Swap.structure);
        Context.checkSignIn();
        const params = { "preference": preference, "swap": swap };
        ctx.insertCollection(Account.load(params));
    },
    "accounts.updatePreference": ({ accountId, preference, swap }) => {
        check(accountId, String);
        check(preference, Preference.structure);
        check(swap, Swap.structure);
        const account = getAccount(accountId);
        const params = { "swap": swap, "preference": preference };
        ctx.updateCollection(account.clone(params));
    },
    "accounts.updateRate": ({ accountId, rate }) => {
        check(accountId, String);
        check(rate, Rate.structure);
        const account = getAccount(accountId);
        const params = { "rate": Rate.load(rate) };
        ctx.updateCollection(account.clone(params));
    },
    "accounts.remove": accountId => {
        check(accountId, String);
        Context.checkSignIn();
        ctx.collection.remove(accountId);
    },
    "accounts.removeUser": () => {
        Context.checkSignIn();
        ctx.collection.remove(Context.uidData());
    },
});