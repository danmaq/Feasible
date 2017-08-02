'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Operation } from '../core/enums/operation.js';

/** Directions collection. */
export const Directions = new Mongo.Collection('directions');

if (Meteor.isServer) {
    Meteor.publish(
        'directions',
        () => Directions.find({ owner: Meteor.userId() }));
}

Meteor.methods({
    "directions.insert": () => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
    },
    "directions.flush": () => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Directions.remove({ owner: Meteor.userId() });
    },
})