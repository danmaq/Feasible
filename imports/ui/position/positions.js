'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Positions } from '../../api/positions.js';

import './positions.html';
import './position.js';
import './addPosition.js';

Template.positions.onCreated(() => { Meteor.subscribe('positions') });
Template.positions.helpers({
    "accountId" () {
        return FlowRouter.getParam('accountId');
    },
    "positions" () {
        return Positions.find({ "accountId": this.accountId });
    },
    "positionLength" () {
        console.log(this.accountId);
        return Positions.find({ "accountId": this.accountId }).count();
    },
});
Template.positions.events({});