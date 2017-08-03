'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Operation } from '../core/enums/operation.js';

/** Directions collection. */
export const Directions = new Mongo.Collection('directions');
import { Direction } from '../core/models/direction.js';

if (Meteor.isServer) {
    Meteor.publish(
        'directions',
        () => Directions.find({ "owner": Meteor.userId() }));
}

Meteor.methods({
    "directions.insert": (operation, positionId, orderId) => {
        check(operation, Number);
        check(positionId, String);
        check(orderId, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        const dir = new Direction(operation, positionId, orderId);
        Directions.insert({ "body": dir, "owner": Meteor.userId() });
    },
    "directions.flush": () => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Directions.remove({ owner: Meteor.userId() });
    },
});