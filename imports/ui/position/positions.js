'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Positions } from '../../api/positions.js';

import { ExchangeKV } from '../../core/enums/exchange.js';
import { Position } from '../../core/models/position.js';

import './positions.html';
import './position.js';
import './addPosition.js';

const getData = () => Template.instance().data;
const DEFAULT_POSITION = new Position();

Template.positions.onCreated(() => { Meteor.subscribe('positions') });
Template.positions.helpers({
    "accountId": () => FlowRouter.getParam('accountId'),
    "positions" () {
        return Positions.find({ "accountId": getData().accountId });
    },
    "positionLength" () {
        console.log(getData().accountId);
        return Positions.find({ "accountId": getData().accountId }).count();
    },
    "price": () => DEFAULT_POSITION.rate,
    "quantity": () => DEFAULT_POSITION.quantity,
    "exchanges": () => ExchangeKV,
});
Template.positions.events({

});