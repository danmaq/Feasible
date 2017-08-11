'use strict';

import { IdModel } from './idModel.js';
import { Exchange } from '../enums/exchange.js';
import { Limit } from '../enums/limit.js';
import { Position } from './position.js';
import { Rate, RateUtil } from './rate.js';

/** Order model. */
export class Order extends IdModel {
    /** Initialize new object. */
    constructor({
        exchange = Exchange.BUY,
        limit = Limit.NONE,
        price = 0,
        quantity = 1,
        takeProfit = Number.NaN,
        preOrder = false
    } = {}) {
        super();
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
    innerClone(override = {}) {
        const result =
            new Order({
                "exchange": this.importValue('exchange', override),
                "limit": this.importValue('limit', override),
                "price": this.importValue('price', override),
                "quantity": this.importValue('quantity', override),
                "takeProfit": this.importValue('takeProfit', override),
                "preOrder": this.importValue('preOrder', override)
            });
    }

    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Order} Order object.
     */
    static load(raw = {}) {
        return new Order().clone(raw);
    }
}

/** Extension of Order model. */
export class OrderUtil {

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
        const result =
            new Position({
                "rate": rate,
                "quantity": this.quantity,
                "exchange": this.exchange,
                "takeProfit": this.takeProfit
            });
        return result;
    }
}