'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Position } from '../core/models/position.js';

export const Positions = new Mongo.Collection('positions');

if (Meteor.isServer) {
    Meteor.publish(
        'positions',
        function positionsPublication() {
            return Positions.Find({ owner: this.userId });
        });
}

Meteor.methods({
    'positions.insert' (position) {
        check(position, Position);
        Positions.insert({
            owner: this.userId,
            body: position
        });
    },
});