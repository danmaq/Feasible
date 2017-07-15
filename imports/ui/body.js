'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './body.html';
import './account/accounts.js';

Template.body.onCreated(() => { console.log(Meteor.userId()); });
Template.body.helpers({ "uid": () => Meteor.userId() });
Template.body.events({});