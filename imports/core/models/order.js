'use strict';

import { Exchange } from '../enums/exchange.js';
import { Limit } from '../enums/limit.js';
import { Position } from './position.js';
import { Rate, RateUtil } from './rate.js';

/** Default exchange type value. */
const DEFAULT_EXCHANGE = Exchange.BUY;

/** Default limit trade type value. */
const DEFAULT_LIMIT = Limit.NONE;

/** Default limit price value. */
const DEFAULT_PRICE = 0;

/** Default ordered quantity value. */
const DEFAULT_QUANTITY = 1;

/** Default take profit value. */
const DEFAULT_TAKEPROFIT = Number.NaN;

/** Order model. */
export class Order {
    /**
     * Initialize new object.
     * @param {number} exchange Exchange type.
     * @param {number} limit Limit trade type.
     * @param {number} price Limit price.
     * @param {number} quantity Ordered quantity.
     * @param {number} takeProfit Take profit.
     * @param {boolean} preOrder pre-order.
     */
    constructor(
        exchange = DEFAULT_EXCHANGE,
        limit = DEFAULT_LIMIT,
        price = DEFAULT_PRICE,
        quantity = DEFAULT_QUANTITY,
        takeProfit = DEFAULT_TAKEPROFIT,
        preOrder = false) {
        this._exchange = exchange;
        this._limit = limit;
        this._price = price;
        this._quantity = quantity;
        this._takeProfit = takeProfit;
        this._preOrder = preOrder;
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

    /** Pre-order. */
    get preOrder() {
        return this._preOrder;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Order} Order object.
     */
    clone(override = {}) {
        return new Order(
            Utils.getValue('exchange', override, this.exchange),
            Utils.getValue('limit', override, this.limit),
            Utils.getValue('price', override, this.price),
            Utils.getValue('quantity', override, this.quantity),
            Utils.getValue('takeProfit', override, this.takeProfit),
            Utils.getValue('preOrder', override, this.preOrder));
    }
}

/** Extension of Order model. */
export class OrderUtil {
    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Order} Order object.
     */
    static load(raw = {}) {
        return new Order().clone(raw);
    }

    /**
     * Get available this order.
     * @param {Rate} rate Current rate.
     * @return {boolean} If available this order, return true.
     */
    static available(source = new Order(), rate = new Rate()) {
        const limit = source.limit;
        if (limit === Limit.NONE) {
            return true;
        }
        const ex = source.exchange;
        const lt = (a, b) => a <= b;
        const gt = (a, b) => a >= b;
        const cmp =
            ex === Exchange.BUY && limit === Limit.STOP ||
            ex === Exchange.SELL && limit === Limit.LIMIT ? lt : gt;
        const op = RateUtil.orderPoint(rate, source.exchange);
        return cmp(op, source.price);
    }

    /**
     * Export to Position object.
     * @param {Rate} rate Current rate.
     * @return {Position} Position object.
     */
    static toPosition(rate = new Rate()) {
        return new Position(
            rate, this.quantity, this.exchange, this.takeProfit);
    }
}