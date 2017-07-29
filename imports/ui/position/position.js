'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ExchangeUtil } from '../../core/enums/exchange.js';
import { Position } from '../../core/models/position.js';

import './position.html'

const getData = () => Template.instance().data;
const getAccountId = () => FlowRouter.getParam('accountId');

Template.position.helpers({
    "strExchange": () => Position.load(getData().body).getStrExchange(),
});
Template.position.events({
    "click .fe-delete": event => {
        event.preventDefault();
        const target = event.target;
        console.log(getAccountId());
    },
});