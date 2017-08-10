'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Accounts } from '../../api/accounts.js';

import { PairUtil } from '../../core/enums/pair.js';
import { Account } from '../../core/models/account.js';

import formUtil from '../formUtil.js';

import './modify.html';

/** Convert function: String to Number. */
const TO_FLOAT = formUtil.to.float;

/** Convert function: String to integer (number). */
const TO_INT = formUtil.to.int;

/** Cached account data. */
let account = null;

/** Get account-id from router. */
const accountId = () => FlowRouter.getParam('accountId');

/** Get account data using id from router. */
const loadAccount = () => {
    const raw =
        account ? account : (account = Accounts.findOne(accountId()));
    return Account.load(raw ? raw : {});
};

Template.accountModify.onDestroyed(() => account = null);
Template.accountModify.onCreated(() => Meteor.subscribe('accounts'));
Template.accountModify.helpers({
    "defaultAccount": loadAccount,
    "strPair": () => PairUtil.toStr(loadAccount().pair),
});
Template.accountModify.events({
    "submit #fe-modify": event => {
        event.preventDefault();
        const params =
            formUtil.parse(
                event.target, {
                    "swap-long": TO_FLOAT,
                    "swap-short": TO_FLOAT,
                    "column": TO_INT,
                    "lot": TO_INT,
                    "mul": TO_FLOAT,
                    "step": TO_FLOAT,
                    "martingale": TO_FLOAT,
                });
        Meteor.call(
            'accounts.update', { "accountId": accountId(), ...params });
        window.history.back();
    },
    "click .fe-cancel": event => {
        event.preventDefault();
        window.history.back();
    },
});
