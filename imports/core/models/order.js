'use strict';

import IdModel from './idModel.js';
import Position from './position.js';
import Rate from './rate.js';

import { Exchange } from '../enums/exchange.js';
import { Limit } from '../enums/limit.js';

/** Structure data. */
const structure =
    Object.freeze({
        ...IdModel.structure,
        _exchange: Number,
        _limit: Number,
        _price: Number,
        _quantity: Number,
        _takeProfit: Number
    });

/** Order model. */
export default class Order extends IdModel {
    /** Initialize new object. */
    constructor({
        id = '',
        price = 0,
        quantity = 1,
        exchange = Exchange.BUY,
        limit = Limit.NONE,
        takeProfit = Number.NaN,
    } = {}) {
        super();
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
     * Clone object.
     * @param {object} override Override object.
     * @return {Order} Order object.
     */
    clone(override = {}) {
        return super.clone(override);
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Order} Order object.
     */
    innerClone(override = {}) {
        const keys = [
            'exchange', 'limit', 'price', 'quantity', 'takeProfit'
        ];
        return new Order(this.getValues(keys, override));
    }

    /** Structure data. */
    static get structure() {
        return structure;
    }

    /** Load from de-serialized object. */
    static load = (raw = {}) =>
        new Order({ id: IdModel.randomId() }).clone(raw);

    /** Get price when limit order. */
    static limitPrice = (source = new Order()) =>
        !!source && source.limit !== Limit.NONE ? source.price : Number.NaN;

    /** Get available this order. */
    static available = (source = new Order(), rate = new Rate()) => {
        if (source.limit === Limit.NONE) {
            return true;
        }
        const ex = source.exchange;
        const lt = (a, b) => a <= b;
        const gt = (a, b) => a >= b;
        const cmp =
            ex === Exchange.BUY && source.limit === Limit.STOP ||
            ex === Exchange.SELL && source.limit === Limit.LIMIT ? lt : gt;
        const op = RateUtil.orderPoint(rate, source.exchange);
        return cmp(op, source.price);
    }

    /** Export to Position object. */
    static toPosition = (source = new Order(), rate = new Rate()) =>
        new Position({
            ...Rate.priceAndTick(rate),
            quantity: source.quantity,
            exchange: source.exchange,
            takeProfit: source.takeProfit
        });
}