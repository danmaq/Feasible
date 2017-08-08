'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Accounts } from '../../api/accounts.js';

import { PairUtil } from '../../core/enums/pair.js';
import { Account } from '../../core/models/account.js';

import './detail.html';
import '../direction/directions.js';
import '../position/positions.js';

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

/** Incremente or decrement to volatility rate value. */
const changeRate = (dir = 1) => {
    const step = loadAccount().step * Math.sign(dir);
    const ch = (q = $('')) =>
        q.val(Math.max(step + Number.parseFloat(q.val()), 0));
    ch($('#ask'));
    ch($('#bid'));
};

Template.accountDetail.onDestroyed(() => account = null);
Template.accountDetail.helpers({
    "account": loadAccount,
    "strPair": () => PairUtil.toStr(loadAccount().pair),
});
Template.accountDetail.events({
    "click #fe-mod-account-rate #fe-rate-up": event => {
        event.preventDefault();
        changeRate(1);
    },
    "click #fe-mod-account-rate #fe-rate-down": event => {
        event.preventDefault();
        changeRate(-1);
    },
    "submit #fe-mod-account-rate": event => {
        event.preventDefault();
        const target = event.target;
        const ask = Number.parseFloat(target['ask'].value);
        const bid = Number.parseFloat(target['bid'].value);
        Meteor.call('directions.flush', accountId());
        Meteor.call('accounts.updateRate', accountId(), ask, bid);
    },
});