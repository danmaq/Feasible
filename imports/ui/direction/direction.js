'set strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ExchangeUtil } from '../../core/enums/exchange.js';
import { Limit, LimitUtil } from '../../core/enums/limit.js';
import { OperationUtil } from '../../core/enums/operation.js';

import AI from '../../core/ai.js';

import Direction from '../../core/models/direction.js';
import Order from '../../core/models/order.js';

import AccountUtil from '../account/accountUtil.js';

import './direction.html';

/** Get template data. */
const data = () => Template.instance().data;

/** Get direction object from template data. */
const direction = () => Direction.load(data());

Template.direction.helpers({
    strOperation: () => {
        return OperationUtil.toStr(direction().operation)
    },
    isPosition: () => !!direction().position,
    strExchange: ExchangeUtil.toStr,
    strLimit: () => LimitUtil.toStr(direction().order.limit),
    price: () => {
        const price = Order.limitPrice(direction().order);
        return Number.isNaN(price) ? '' : price.toString();
    },
});
Template.direction.events({
    "click .fe-commit": event => {
        const result = AI.commit(AccountUtil.loadAccount(), direction());
        console.log(result);
    },
});