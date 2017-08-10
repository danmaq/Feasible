'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Context } from './context.js';

import { Account } from '../core/models/account.js';
import { Rate } from '../core/models/rate.js';
import { Swap } from '../core/models/swap.js';

/** API Context. */
const ctx = new Context('accounts');

/** Accounts collection. */
export const Accounts = ctx.collection;

Meteor.methods({
    "accounts.insert": ({
        pair,
        "swap-long": swapLong,
        "swap-short": swapShort,
        column,
        lot,
        mul,
        step,
        martingale,
    }) => {
        check(pair, Number);
        check(swapLong, Number);
        check(swapShort, Number);
        check(column, Number);
        check(lot, Number);
        check(mul, Number);
        check(step, Number);
        check(martingale, Number);
        Context.checkSignIn();
        const swap = new Swap({ "long": swapLong, "short": swapShort });
        const account =
            new Account({
                "pair": pair,
                "rate": new Rate(),
                "swap": swap,
                "column": column,
                "lot": lot,
                "multiply": mul,
                "step": step,
                "martingale": martingale
            });
        ctx.insertCollection(account);
    },
    "accounts.update": ({
        accountId,
        "swap-long": swapLong,
        "swap-short": swapShort,
        column,
        lot,
        mul,
        step,
        martingale,
    }) => {
        check(accountId, String);
        check(swapLong, Number);
        check(swapShort, Number);
        check(column, Number);
        check(lot, Number);
        check(mul, Number);
        check(step, Number);
        check(martingale, Number);
        Context.checkSignIn();
        const accountRaw = Accounts.findOne(accountId);
        if (!accountRaw) {
            throw new Meteor.Error('unknown-account');
        }
        const account = Account.load(accountRaw);
        const swap =
            account.swap.clone({ "long": swapLong, "short": swapShort });
        const cloned =
            account.clone({
                "swap": swap,
                "column": column,
                "lot": lot,
                "multiply": mul,
                "step": step,
                "martingale": martingale
            });
        ctx.updateCollection(cloned);
    },
    "accounts.remove": accountId => {
        check(accountId, String);
        Context.checkSignIn();
        Accounts.remove(accountId);
    },
    "accounts.removeUser": () => {
        Context.checkSignIn();
        Accounts.remove(Context.uidData());
    },
    "accounts.updateRate": ({accountId, ask, bid}) => {
        check(accountId, String);
        check(ask, Number);
        check(bid, Number);
        Context.checkSignIn();
        const accountRaw = Accounts.findOne(accountId);
        if (!accountRaw) {
            throw new Meteor.Error('unknown-account');
        }
        const account = Account.load(accountRaw);
        const rate = account.rate.clone({ "ask": ask, "bid": bid });
        const cloned = account.clone({ "rate": rate });
        ctx.updateCollection(cloned);
    },
});