'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Order } from '../core/models/order.js';

export const Orders = new Mongo.Collection('orders');

if (Meteor.isServer) {
    Meteor.publish(
        'orders',
        function() {
            return Orders.find({ owner: this.userId });
        });
}

Meteor.methods({
    'orders.insert' (order) {
        check(order, Order);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Orders.insert({
            order,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },
    'orders.remove' (orderId) {
        check(orderId, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Orders.remove(orderId);
    },
});