'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Positions } from '../../api/positions.js';

import './positions.html';
import './position.js';
import './addPosition.js';

Template.positions.onCreated(() => Meteor.subscribe('positions'));
Template.positions.helpers({
    "positions" () {
        return Positions.find({ "accountId": this.accountId });
    },
    "positionLength" () {
        return Positions.find({ "accountId": this.accountId }).count();
    },
});
Template.positions.events({});