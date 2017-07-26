'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { PairUtil } from '../../core/enums/pair.js';
import { Account } from '../../core/models/account.js';

import './account.html';
import '../position/positions.js';

const getData = () => Template.instance().data;
const toAccount = () => Account.load(getData().body);
Template.account.helpers({
    "strPair": () => {
        return Account.load(toAccount()).getStrPair();
    },
});

Template.account.events({
    "click .fe-delete": e => {
        const data = getData();
        Meteor.call('positions.removeByAccount', data._id);
        Meteor.call('accounts.remove', data._id);
    },
    "click .fe-detail": e => console.log("detail: ", getData()._id),
});