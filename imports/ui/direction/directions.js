'set strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Directions } from '../../api/directions.js';

import './directions.html';
import './direction.js';

/** Get account-id from router. */
const getAccountId = () => FlowRouter.getParam('accountId');

/** Get positions list from account-id. */
const getDirections = () => Directions.find({ "accountId": getAccountId() });

Template.directions.onCreated(() => {
    Meteor.subscribe('directions');
});
Template.directions.helpers({
    "directions": getDirections,
    "directionLength": () => getDirections().count(),
});
Template.directions.events({

});