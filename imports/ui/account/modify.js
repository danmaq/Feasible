'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import Accounts from '../../api/accounts.js';

import { PairUtil } from '../../core/enums/pair.js';

import Account from '../../core/models/account.js';

import AccountUtil from './accountUtil.js';
import formUtil from '../formUtil.js';

import { AccountFormUtil } from './form.js';
import './form.js';
import './modify.html';

Template.accountModify.onCreated(AccountUtil.subscribe);
Template.accountModify.onDestroyed(AccountUtil.unloadAccount);
Template.accountModify.helpers({
    defaultAccount: AccountUtil.loadAccount,
    strPair: () =>
        PairUtil.toStr(AccountUtil.tryGet(0, a => a.preference.pair)),
});
Template.accountModify.events({
    "submit #fe-modify": event => {
        event.preventDefault();
        const params =
            AccountFormUtil.params(
                event.target,
                AccountFormUtil.paramsTemplate,
                AccountUtil.loadAccount().preference);
        const accountId = AccountUtil.accountId();
        const paramsWithId = { "accountId": accountId, ...params };
        Meteor.call('accounts.updatePreference', paramsWithId);
        AccountUtil.unloadAccount();
        window.history.back();
    },
    "click .fe-cancel": event => {
        event.preventDefault();
        window.history.back();
    },
});