'use strict';

import { Exchange } from '../enums/exchange.js'
import { Limit } from '../enums/limit.js'
import { Position } from './position.js'
import { Rate } from './rate.js'

/** Order model. */
export class Order {
    /**
     * Initialize new object.
     * @param {number} exchange Exchange type.
     * @param {number} limit Limit trade type.
     * @param {number} price Limit price.
     * @param {number} quantity Ordered quantity.
     * @param {number} takeProfit Take profit.
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
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Order} Order object.
     */
    static load(raw = new Object()) {
        return new Order(
            raw["exchange"],
            raw["limit"],
            raw["price"],
            raw["quantity"],
            raw["takeProfit"]);
    }

    /**
     * Get available this order.
     * @param {Rate} rate Current rate.
     * @return {boolean} If available this order, return true.
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
     * @param {Rate} rate Current rate.
     * @return {Position} Position object.
     */
    toPosition(rate = new Rate()) {
        return new Position(
            rate, this.quantity, this.exchange, this.takeProfit);
    }
}