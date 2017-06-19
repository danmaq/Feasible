'use strict';

import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';

import { Positions } from '../api/positions.js';

import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('positions');
});

Template.body.helpers({
    positions() { return Positions.Find({}); }
});

Template.body.events({

});