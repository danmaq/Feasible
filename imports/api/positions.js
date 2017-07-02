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
            return Positions.find({ owner: this.userId });
        });
}

Meteor.methods({
    'positions.insert' (position) {
        check(position, Position);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Positions.insert({
            position,
            owner: Meteor.userId()
        });
    },
    'positions.remove' (positionId) {
        check(positionId, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Positions.remove(positionId);
    },
});