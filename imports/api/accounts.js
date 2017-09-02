'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Context } from './context.js';

import Account from '../core/models/account.js';
import Direction from '../core/models/direction.js';
import IdModel from '../core/models/idModel.js';
import Position from '../core/models/position.js';
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
        ctx.insertCollection(Account.load({ preference, swap }));
    },
    "accounts.updatePreference": ({ accountId, preference, swap }) => {
        check(accountId, String);
        check(preference, Preference.structure);
        check(swap, Swap.structure);
        const params = { preference, swap };
        ctx.updateCollection(getAccount(accountId).clone(params));
    },
    "accounts.updateRate": ({ accountId, rate }) => {
        check(accountId, String);
        check(rate, Rate.structure);
        const params = { "rate": Rate.load(rate) };
        ctx.updateCollection(getAccount(accountId).clone(params));
    },
    "accounts.updatePositions": ({ accountId, positions }) => {
        check(accountId, String);
        check(positions, [Position.structure]);
        const params = { "positions": positions.map(Position.load) };
        ctx.updateCollection(getAccount(accountId).clone(params));
    },
    "accounts.remove": accountId => {
        check(accountId, String);
        Context.checkSignIn();
        ctx.collection.remove(accountId);
    },
    "accounts.removePosition": ({ accountId, positionId }) => {
        check(accountId, String);
        Context.checkSignIn();
        const account = getAccount(accountId);
        const next = IdModel.remove(positionId, account.positions);
        ctx.updateCollection(account.clone({ positions: next }));
    },
    "accounts.removeUser": () => {
        Context.checkSignIn();
        ctx.collection.remove(Context.uidData());
    },
});