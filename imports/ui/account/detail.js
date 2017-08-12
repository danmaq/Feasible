'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import Accounts from '../../api/accounts.js';

import { PairUtil } from '../../core/enums/pair.js';

import Account from '../../core/models/account.js';
import Preference from '../../core/models/preference.js';
import Rate from '../../core/models/rate.js';

import AccountUtil from './accountUtil.js';
import formUtil from '../formUtil.js';

import './detail.html';
import '../direction/directions.js';
import '../position/positions.js';

/** Convert function: String to Number. */
const TO_FLOAT = formUtil.to.float;

/** Incremente or decrement to volatility rate value. */
const changeRate = (vel = 1) => {
    const step = AccountUtil.tryGet(0, a => a.preference.step) * vel;
    const ch = (q = $('')) =>
        q.val(Math.max(step + Number.parseFloat(q.val()), 0));
    ch($('#ask'));
    ch($('#bid'));
};

Template.accountDetail.onCreated(AccountUtil.subscribe);
Template.accountDetail.onDestroyed(AccountUtil.unloadAccount);
Template.accountDetail.helpers({
    "account": AccountUtil.loadAccount,
    "strPair":
        () => PairUtil.toStr(AccountUtil.tryGet(0, a => a.preference.pair)),
    "minStep": () => Preference.minStep(AccountUtil.tryGet(new Preference(), a => a.preference)),
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
        const formParams =
            formUtil.parse(
                event.target, { "ask": TO_FLOAT, "bid": TO_FLOAT });
        const params = {
            "accountId": AccountUtil.accountId(),
            "rate": {...Rate.load(formParams) }
        };
        Meteor.call('accounts.updateRate', params);
    },
});