'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Accounts } from '../../api/accounts.js';

import { PairUtil } from '../../core/enums/pair.js';
import { Account, AccountUtil } from '../../core/models/account.js';

import formUtil from '../formUtil.js';

import './detail.html';
import '../direction/directions.js';
import '../position/positions.js';

/** Convert function: String to Number. */
const TO_FLOAT = formUtil.to.float;

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

Template.accountDetail.onCreated(() => Meteor.subscribe('accounts'));
Template.accountDetail.onDestroyed(() => account = null);
Template.accountDetail.helpers({
    "account": loadAccount,
    "strPair": () => PairUtil.toStr(loadAccount().pair),
    "minStep": () => AccountUtil.minStep(loadAccount()),
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
        const params =
            formUtil.parse(
                event.target, { "ask": TO_FLOAT, "bid": TO_FLOAT });
        const aid = accountId();
        Meteor.call(
            'accounts.updateRate', { "accountId": aid, ...params });
        Meteor.call('directions.flush', aid);
    },
});