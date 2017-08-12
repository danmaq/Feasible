'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './body.html';
import './lp.js';
import './account/accounts.js';
import './account/detail.js';
import './account/modify.js';

Tracker.autorun(() => {
    if (!Meteor.userId()) {
        FlowRouter.go('home');
    }
});

Template._loginButtonsAdditionalLoggedInDropdownActions.events({
    "click #dashboard": event => {
        event.preventDefault();
        FlowRouter.go('accounts.show');
    }
});