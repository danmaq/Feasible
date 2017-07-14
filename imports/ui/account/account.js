'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { PairUtil } from '../../core/enums/pair.js';
import { Account } from '../../core/models/account.js';

import './account.html';
import '../position/positions.js';

Template.account.helpers({
    "strPair" () {
        return Account.load(this.body).getStrPair();
    },
});

Template.account.events({
    "click .fe-delete" (event) {
        Meteor.call('positions.removeByAccount', this._id);
        Meteor.call('accounts.remove', this._id);
    },
});