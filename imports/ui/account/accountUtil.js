'use strict';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import Accounts from '../../api/accounts.js';

import Account from '../../core/models/account.js';

const KEY = 'account';
Session.setDefault(KEY, null);

/** Get account-id from router. */
export const accountId = () => `${FlowRouter.getParam('accountId')}`;

/** Get account data using id from router. */
export const loadAccount = () => {
    if (!Session.get(KEY)) {
        Session.set(KEY, Accounts.findOne(accountId()));
    }
    return Account.load(Session.get(KEY));
};

/** Flush cached account data. */
export const unloadAccount = () => Session.set(KEY, null);

/** Subscribe account server data. */
export const subscribe = () => Meteor.subscribe('accounts');

/** Get account value when exists. */
export const tryGet =
    (alternative = null, getter = (account = new Account()) => null) => {
        const account = loadAccount();
        return account ? getter(account) : alternative;
    };