'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './account.html';

Template.account.helpers({});

Template.account.events({
    "click .fe-delete" (event) {
        Meteor.call('accounts.remove', this._id);
    },
});