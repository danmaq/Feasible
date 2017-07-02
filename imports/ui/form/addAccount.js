'use strict'

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { Accounts } from '../../api/accounts.js';

import { Pair, PairUtil } from '../../core/enums/pair.js';
import { Account } from '../../core/models/account.js';

import './addAccount.html';

const DEFAULT_PAIR = Pair.EURUSD;
const DEFAULT_LOT = 10000;
const DEFAULT_MULTIPLY = 0.01;
const DEFAULT_STEP = 0.5;
const DEFAULT_MARTINGALE = 2;

Template.addAccount.onCreated(() => {});
Template.addAccount.helpers({
    "lot": () => DEFAULT_LOT,
    "multiply": () => DEFAULT_MULTIPLY,
    "step": () => DEFAULT_STEP,
    "martingale": () => DEFAULT_MARTINGALE,
    "pairs": () => Array.from(PairUtil.iterkv()),
});
Template.addAccount.events({
    "submit #add-account": event => {
        event.preventDefault();
        const target = event.target;
        const pair = Number.parseInt(target['pair'].value);
        const lot = Number.parseInt(target['lot'].value);
        const mul = Number.parseFloat(target['mul'].value);
        const step = Number.parseFloat(target['step'].value);
        const martin = Number.parseFloat(target['martingale'].value);
        Meteor.call('accounts.insert', pair, lot, mul, step, martin);
    },
});