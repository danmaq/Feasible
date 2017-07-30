'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Accounts } from '../../api/accounts.js';

import { PairUtil } from '../../core/enums/pair.js';
import { Account, AccountUtil } from '../../core/models/account.js';

import './detail.html';
import '../position/positions.js'

/** Cached account data. */
let account = new Account();
account = null;

/** Get account-id from router. */
const getAccountId = () => FlowRouter.getParam('accountId');

/** Get account raw data using id from router. */
const getAccountRaw = () =>
    account ? account : (account = Accounts.findOne(getAccountId()));

/** Get account data using id from router. */
const getAccount = () => {
    const raw = getAccountRaw();
    return AccountUtil.load(raw ? raw.body : {});
};

/** Incremente or decrement to volatility rate value. */
const changeRate = (dir = 1) => {
    const step = getAccount().step * dir;
    const ch = (s = '') => {
        const q = $(s);
        q.val(Math.max(step + Number.parseFloat(q.val()), 0));
    };
    ch('#ask');
    ch('#bid');
};

Template.accountDetail.onCreated(() => {});
Template.accountDetail.onDestroyed(() => account = null);
Template.accountDetail.helpers({
    "account": getAccount,
    "strPair": () => PairUtil.toStr(getAccount().pair),
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
        Meteor.call('accounts.updateRate', getAccountId(), ask, bid);
    },
});