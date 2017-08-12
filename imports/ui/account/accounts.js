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
import './accounts.html';
import './account.js';

/** Default account instance. */
const DEFAULT_ACCOUNT = new Account();

Template.accounts.onCreated(AccountUtil.subscribe);
Template.accounts.helpers({
    "defaultAccount": DEFAULT_ACCOUNT,
    "accounts": () => Accounts.find(),
    "accountLength": () => Accounts.find().count(),
    "pairs": Array.from(PairUtil.iterkv()),
});
Template.accounts.events({
    "submit #fe-add-account": event => {
        event.preventDefault();
        const paramsTemplate = {
            "pair": formUtil.to.int,
            ...AccountFormUtil.paramsTemplate
        };
        const params =
            AccountFormUtil.params(event.target, paramsTemplate);
        Meteor.call('accounts.create', params);
    },
});