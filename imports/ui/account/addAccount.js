'use strict'

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { Accounts } from '../../api/accounts.js';

import { Pair, PairUtil } from '../../core/enums/pair.js';
import { Account } from '../../core/models/account.js';

import './addAccount.html';

const DEFAULT_ACCOUNT = new Account();

Template.addAccount.onCreated(() => {});
Template.addAccount.helpers({
    "lot": () => DEFAULT_ACCOUNT.lot,
    "multiply": () => DEFAULT_ACCOUNT.mul,
    "step": () => DEFAULT_ACCOUNT.step,
    "martingale": () => DEFAULT_ACCOUNT.martingale,
    "pairs": () => Array.from(PairUtil.iterkv()),
});
Template.addAccount.events({
    "submit #fe-add-account": event => {
        event.preventDefault();
        const target = event.target;
        const pair = Number.parseInt(target['pair'].value);
        const swapLong = Number.parseInt(target['swap-long'].value);
        const swapShort = Number.parseInt(target['swap-short'].value);
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