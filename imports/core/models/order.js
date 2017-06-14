'use strict';

import { Exchange } from '../enums/exchange.js'
import { Limit } from '../enums/limit.js'
import { Position } from './position.js'
import { Rate } from './rate.js'

/** Order model. */
export class Order {
    /**
     * Initialize new object.
     * @param exchange Exchange type.
     * @param limit Limit trade type.
     * @param price Limit price.
     * @param quantity Ordered quantity.
     * @param takeProfit Take profit.
     */
    constructor(
        exchange = Exchange.BUY,
        limit = Limit.NONE,
        price = 0,
        quantity = 1,
        takeProfit = NaN) {
        this._exchange = exchange;
        this._limit = limit;
        this._price = price;
        this._quantity = quantity;
        this._takeProfit = takeProfit;
    }

    /** Exchange type. */
    get exchange() {
        return this._exchange;
    }

    /** Limit trade type. */
    get limit() {
        return this._limit;
    }

    /** Limit price. Plus: stop, Minus: Limit */
    get price() {
        return this._price;
    }

    /** Ordered quantity. */
    get quantity() {
        return this._quantity;
    }

    /** Take profit. */
    get takeProfit() {
        return this._takeProfit;
    }

    /**
     * Get available this order.
     * @param rate Current rate.
     * @return If available this order, return true.
     */
    available(rate = new Rate()) {
        const limit = this.limit;
        if (limit === Limit.NONE) {
            return true;
        }
        const ex = this.exchange;
        const lt = (a, b) => a <= b;
        const gt = (a, b) => a >= b;
        const cmp =
            ex === Exchange.BUY && limit === Limit.STOP ||
            ex === Exchange.SELL && limit === Limit.LIMIT ? lt : gt;
        return cmp(rate.orderPoint(this.exchange), this.price);
    }

    /**
     * Export to Position object.
     * @param rate Current rate.
     * @return Position object.
     */
    toPosition(rate = new Rate()) {
        return new Position(
            rate, this.quantity, this.exchange, this.takeProfit);
    }
}