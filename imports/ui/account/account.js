'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { PairUtil } from '../../core/enums/pair.js';
import { Account, AccountUtil } from '../../core/models/account.js';

import './account.html';

/** Get template data. */
const getData = () => Template.instance().data;

/** Get Account data from template data. */
const getAccount = () => AccountUtil.load(getData().body);

Template.account.helpers({
    "strPair": () => AccountUtil.getStrPair(getAccount()),
});

Template.account.events({
    "click .fe-delete": event => {
        event.preventDefault();
        const data = getData();
        Meteor.call('positions.removeByAccount', data._id);
        Meteor.call('directions.flush', data._id);
        Meteor.call('accounts.remove', data._id);
    },
    "click .fe-modify": event => {
        event.preventDefault();
    },
});