'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ExchangeUtil } from '../../core/enums/exchange.js';
import Position from '../../core/models/position.js';

import AccountUtil from '../account/accountUtil.js';
import './position.html';

/** Get template data. */
const getData = () => Template.instance().data;

/** Get position instance from template data. */
const getPosition = () => Position.load(getData()['position']);

Template.position.helpers({
    strExchange: () => ExchangeUtil.toStr(getPosition().exchange),
});
Template.position.events({
    "click .fe-delete": event => {
        event.preventDefault();
        const params = {
            accountId: getData()['accountId'],
            positionId: getPosition().id
        };
        Meteor.call('accounts.removePosition', params);
        AccountUtil.unloadAccount();
    },
});