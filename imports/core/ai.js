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
export const flushOrder =
    (orders = [new Order()]) =>
    orders.map(o => Direction.load({ "order": o, ...CANCEL }));

/** Create first direction. */
export const firstDirection =
    (rate = new Rate(), step = 0) => {
        const order = (e = 0) => new Order({
            "price": Rate.orderPrice(rate, e),
            "limit": Limit.NONE,
            "quantity": 1,
            "exchange": e,
            "takeProfit": Rate.orderPrice(rate, e) + step * e
        });
        const direction = (e = 0) =>
            Direction.load({ "operation": Operation.ORDER, "order": order(e) });
        return [direction(Exchange.BUY), direction(Exchange.SELL)];
    };

/** Create next strategy directions. */
export const next =
    (account = new Account()) => {
        if (!account) {
            return [];
        }
        if (account.positions.length === 0) {
            const flush = flushOrder(account.orders);
            const first =
                firstDirection(account.rate, account.preference.step);
            return [...flush, ...first];
        }
        return [];
    };

/** Commit direction. */
export const commit =
    (account = new Account(), direction = new Direction()) => {
        return account.clone();
    };