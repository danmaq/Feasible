'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ExchangeUtil } from '../../core/enums/exchange.js';
import { Position } from '../../core/models/position.js';

import './position.html';

/** Get template data. */
const getData = () => Template.instance().data;

/** Get position instance from template data. */
const getPosition = () => Position.load(getData());

Template.position.helpers({
    "strExchange": () => ExchangeUtil.toStr(getPosition().exchange),
});
Template.position.events({
    "click .fe-delete": event => {
        event.preventDefault();
        Meteor.call('positions.remove', getData()._id);
    },
});