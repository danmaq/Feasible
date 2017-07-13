'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ExchangeUtil } from '../../core/enums/exchange.js';
import { Position } from '../../core/models/position.js';

import './position.html'

Template.position.helpers({
    "strExchange" () {
        return Position.load(this.body).getStrExchange();
    }
});
Template.position.events({
    "click .fe-delete" (event) {},
});