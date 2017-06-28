'use strict'

import { Template } from 'meteor/templating';

import { PairUtil } from '../../core/enums/pair.js';
import { Accounts } from '../../api/accounts.js';

import './addAccount.html';

Template.addAccount.onCreated(() => {});
Template.addAccount.helpers({
    pairs() { return Array.from(PairUtil.iterkv()); },
});
Template.addAccount.events({
    'submit #add-account' (event) {
        event.preventDefault();
        const target = event.target;
        const pair = Number.parseInt(target['pair'].value);
        const lot = Number.parseInt(target['lot'].value);
        const mul = Number.parseFloat(target['mul'].value);
        const step = Number.parseFloat(target['step'].value);
        const martingale = Number.parseFloat(target['martingale'].value);
        console.log(pair, lot, mul, step);
    },
});