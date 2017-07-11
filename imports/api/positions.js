'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Accounts } from './accounts.js';

import { Position } from '../core/models/position.js';
import { Rate } from '../core/models/rate.js';

export const Positions = new Mongo.Collection('positions');

if (Meteor.isServer) {
    Meteor.publish(
        'positions',
        function positionsPublication() {
            return Positions.find({ owner: this.userId });
        });
}

Meteor.methods({
    'positions.insert' (accountId, buy, sell, quantity, exchange, takeProfit) {
        check(accountId, String);
        check(buy, Number);
        check(sell, Number);
        check(quantity, Number);
        check(exchange, Number);
        check(takeProfit, Number);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        const rate = new Rate();
        const position = new Position(rate);
        /*
        Positions.insert({
            position,
            owner: Meteor.userId()
        });
        */
    },
    'positions.remove' (positionId) {
        check(positionId, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Positions.remove(positionId);
    },
});