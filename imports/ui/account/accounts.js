'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Accounts } from '../../api/accounts.js';

import { Pair, PairUtil } from '../../core/enums/pair.js';
import { Account } from '../../core/models/account.js';

import './accounts.html';
import './account.js';

/** Default account instance. */
const DEFAULT_ACCOUNT = new Account();

Template.accounts.onCreated(() => Meteor.subscribe('accounts'));
Template.accounts.helpers({
    "accounts": () => Accounts.find({}, { "sort": { "sortBy": 1 } }),
    "accountLength": () => Accounts.find().count(),
    "lot": () => DEFAULT_ACCOUNT.lot,
    "multiply": () => DEFAULT_ACCOUNT.mul,
    "step": () => DEFAULT_ACCOUNT.step,
    "martingale": () => DEFAULT_ACCOUNT.martingale,
    "pairs": () => Array.from(PairUtil.iterkv()),
});
Template.accounts.events({
    "submit #fe-add-account": event => {
        event.preventDefault();
        const target = event.target;
        const pair = Number.parseInt(target['pair'].value);
        const swapLong = Number.parseFloat(target['swap-long'].value);
        const swapShort = Number.parseFloat(target['swap-short'].value);
        const lot = Number.parseInt(target['lot'].value);
        const mul = Number.parseFloat(target['mul'].value);
        const step = Number.parseFloat(target['step'].value);
        const martin = Number.parseFloat(target['martingale'].value);
        Meteor.call(
            'accounts.insert',
            pair,
            swapLong,
            swapShort,
            lot,
            mul,
            step,
            martin);
    },
});