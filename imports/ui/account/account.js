'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { PairUtil } from '../../core/enums/pair.js';
import { Account } from '../../core/models/account.js';

import { Accounts } from '../../api/accounts.js';

import './account.html';

/** Get template data. */
const getData = () => Template.instance().data;

/** Get Account data from template data. */
const getAccount = () => Account.load(getData());

Template.account.helpers({
    "strPair": () => PairUtil.toStr(getAccount().pair),
});

Template.account.events({
    "click .fe-delete": event => {
        event.preventDefault();
        const data = getData();
        Meteor.call('positions.removeByAccount', data._id);
        Meteor.call('accounts.remove', data._id);
    },
});