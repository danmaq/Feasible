'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Accounts } from '../../api/accounts.js';

import { PairUtil } from '../../core/enums/pair.js';
import { Account } from '../../core/models/account.js';

import './accounts.html';
import './account.js';

/** Default account instance. */
const DEFAULT_ACCOUNT = new Account();

Template.accounts.onCreated(() => Meteor.subscribe('accounts'));
Template.accounts.helpers({
    "accounts": () => Accounts.find({}, { "sort": { "sortBy": 1 } }),
    "accountLength": () => Accounts.find().count(),
    "lot": DEFAULT_ACCOUNT.lot,
    "multiply": DEFAULT_ACCOUNT.mul,
    "step": DEFAULT_ACCOUNT.step,
    "martingale": DEFAULT_ACCOUNT.martingale,
    "pairs": Array.from(PairUtil.iterkv()),
});
Template.accounts.events({
    "submit #fe-add-account": event => {
        event.preventDefault();
        const target = event.target;
        Meteor.call(
            'accounts.insert',
            Number.parseInt(target['pair'].value),
            Number.parseFloat(target['swap-long'].value),
            Number.parseFloat(target['swap-short'].value),
            Number.parseInt(target['lot'].value),
            Number.parseFloat(target['mul'].value),
            Number.parseFloat(target['step'].value),
            Number.parseFloat(target['martingale'].value));
    },
});