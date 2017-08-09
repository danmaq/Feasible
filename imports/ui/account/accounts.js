'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Accounts } from '../../api/accounts.js';

import { PairUtil } from '../../core/enums/pair.js';
import { Account } from '../../core/models/account.js';

import formUtil from '../formUtil.js';

import './accounts.html';
import './account.js';

/** Default account instance. */
const DEFAULT_ACCOUNT = new Account();

/** Convert function: String to Number. */
const TO_FLOAT = formUtil.to.float;

/** Convert function: String to integer (number). */
const TO_INT = formUtil.to.int;

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
        const params =
            formUtil.parse(
                event.target, {
                    "pair": TO_INT,
                    "swap-long": TO_FLOAT,
                    "swap-short": TO_FLOAT,
                    "lot": TO_INT,
                    "mul": TO_FLOAT,
                    "step": TO_FLOAT,
                    "martingale": TO_FLOAT,
                });
        Meteor.call('accounts.insert', params);
    },
});