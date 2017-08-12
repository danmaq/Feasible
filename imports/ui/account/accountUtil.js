'use strict';

import { Meteor } from 'meteor/meteor';

import Accounts from '../../api/accounts.js';

import Account from '../../core/models/account.js';

/** Cached account data. */
let account = new Account();
account = null;

/** Get account-id from router. */
export const accountId = () => `${FlowRouter.getParam('accountId')}`;

/** Get account data using id from router. */
export const loadAccount = () => {
    if (!account) {
        const raw = Accounts.findOne(accountId());
        account = !!raw ? Account.load(raw) : null;
    }
    return account;
};

/** Flush cached account data. */
export const unloadAccount = () => account = null;

/** Subscribe account server data. */
export const subscribe = () => Meteor.subscribe('accounts');

/** Get account value when exists. */
export const tryGet =
    (alternative = null, getter = (account = new Account()) => null) => {
        const account = loadAccount();
        return account ? getter(account) : alternative;
    };