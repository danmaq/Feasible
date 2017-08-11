'use strict';

import { Exchange } from './enums/exchange.js';
import { Operation } from './enums/operation.js';

import { Account } from './models/account.js';
import { Rate, RateUtil } from './models/rate.js';
import { Direction } from './models/direction.js';
import { Order } from './models/order.js';
import { Position } from './models/position.js';

/** AI Logic. */
export class AI {
    /** Create directions of flush orders. */
    static flushOrder = (orders = [new Order()]) =>
        orders.map(
            o => new Direction({
                "order": o,
                "operation": Operation.CANCEL
            }));
    static firstDirection = (account = new Account()) => {
        const pos = e => new Position({
            "accountId": account.id,
            "price": RateUtil.orderPoint(account.rate, e),
            "quantity": 1,
            "exchange": e,
            "takeProfit": Number.NaN
        });
        return [pos(Exchange.BUY), pos(Exchange.SELL)];
    };
    /** Create next strategy directions. */
    static next = ({
        rate = new Rate(),
        orders = [new Order()],
        positions = [new Position()],
    } = {}) => {
        if (positions.length === 0) {
            const flush = DirectionUtil.flushOrder(orders);
            return [...flush];
        }
        return [];
    };
}