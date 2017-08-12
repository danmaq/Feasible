'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import Accounts from '../../api/accounts.js';

import { PairUtil } from '../../core/enums/pair.js';

import Account from '../../core/models/account.js';
import Preference from '../../core/models/preference.js';
import Swap from '../../core/models/swap.js';

import formUtil from '../formUtil.js';

import './accounts.html';
import './account.js';

/** Default account instance. */
const DEFAULT_ACCOUNT = new Account();

/** Convert function: String to Number. */
const TO_FLOAT = formUtil.to.float;

/** Convert function: String to integer (number). */
const TO_INT = formUtil.to.int;

Template.accounts.onCreated(() => Meteor.subscribe('accounts'));
Template.accounts.helpers({
    "defaultAccount": DEFAULT_ACCOUNT,
    "accounts": () => Accounts.find(),
    "accountLength": () => Accounts.find().count(),
    "pairs": Array.from(PairUtil.iterkv()),
});
Template.accounts.events({
    "submit #fe-add-account": event => {
        event.preventDefault();
        const formParams =
            formUtil.parse(
                event.target, {
                    "pair": TO_INT,
                    "swap-long": TO_FLOAT,
                    "swap-short": TO_FLOAT,
                    "column": TO_INT,
                    "lot": TO_INT,
                    "mul": TO_FLOAT,
                    "step": TO_FLOAT,
                    "martingale": TO_FLOAT,
                });
        const swapParams = {
            "long": formParams['swap-long'],
            "short": formParams['swap-short']
        };
        const params = {
            "preference": Preference.load(formParams),
            "swap": Swap.load(swapParams),
        };
        Meteor.call('accounts.insert', params);
    },
});