'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ExchangeUtil } from '../../core/enums/exchange.js';
import { Position, PositionUtil } from '../../core/models/position.js';

import './position.html'

/** Get template data. */
const getData = () => Template.instance().data;

/** Get position instance from template data. */
const getPosition = () => PositionUtil.load(getData().body);

/** Get account-id from router. */
const getAccountId = () => FlowRouter.getParam('accountId');

Template.position.helpers({
    "strExchange": () => PositionUtil.strExchange(getPosition()),
});
Template.position.events({
    "click .fe-delete": event => {
        event.preventDefault();
        Meteor.call('positions.remove', getData()._id);
    },
});