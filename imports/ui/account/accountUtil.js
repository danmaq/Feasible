'use strict';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import Accounts from '../../api/accounts.js';

import Account from '../../core/models/account.js';

import AI from '../../core/ai.js';

const KEY_ACCOUNT = 'account';
Session.setDefault(KEY_ACCOUNT, null);

/** Get account-id from router. */
export const accountId = () => `${FlowRouter.getParam('accountId')}`;

/** Get account data using id from router. */
export const loadAccount = () => {
    if (!Session.get(KEY_ACCOUNT)) {
        Session.set(KEY_ACCOUNT, Accounts.findOne(accountId()));
    }
    return Account.load(Session.get(KEY_ACCOUNT));
};

/** Flush cached account data. */
export const unloadAccount = () => Session.set(KEY_ACCOUNT, null);

/** Subscribe account server data. */
export const subscribe = () => Meteor.subscribe('accounts');

/** Get account value when exists. */
export const tryGet =
    (alternative = null, getter = (account = new Account()) => null) => {
        const account = loadAccount();
        return account ? getter(account) : alternative;
    };