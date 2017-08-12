'use strict';

import { Exchange } from './enums/exchange.js';
import { Limit } from './enums/limit.js';
import { Operation } from './enums/operation.js';

import Account from './models/account.js';
import Rate from './models/rate.js';
import Direction from './models/direction.js';
import Order from './models/order.js';
import Position from './models/position.js';

/** Cancel operaiton. */
const CANCEL = { "operation": Operation.CANCEL };

/** Create directions of flush orders. */
export const flushOrder = (orders = [new Order()]) =>
    orders.map(o => new Direction({ "order": o, ...CANCEL }));

/** Create first direction. */
export const firstDirection = (rate = new Rate()) => {
    const order = (e = 0) => new Order({
        "price": RateUtil.orderPoint(rate, e),
        "limit": Limit.NONE,
        "quantity": 1,
        "exchange": e,
        "takeProfit": Number.NaN
    });
    const direction = (e = 0) =>
        new Direction({ "operation": Operation.ORDER, "order": order(e) });
    return [direction(Exchange.BUY), direction(Exchange.SELL)];
};

/** Create next strategy directions. */
export const next = (account = new Account()) => {
    if (account.positions.length === 0) {
        const flush = flushOrder(orders);
        const first = firstDirection(account.rate);
        return [...flush, ...first];
    }
    return [];
};
